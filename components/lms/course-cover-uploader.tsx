"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2, Check } from "lucide-react";

interface CourseCoverUploaderProps {
  courseId: string;
  initialCoverId?: string;
  onUploadComplete?: (mediaId: string) => void;
}

type UploadStep = "idle" | "uploading" | "verifying" | "attaching" | "complete";

export function CourseCoverUploader({
  courseId,
  initialCoverId,
  onUploadComplete,
}: CourseCoverUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<UploadStep>("idle");
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    // Validate file type
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (12MB max)
    if (selectedFile.size > 12 * 1024 * 1024) {
      setError("File too large. Max size: 12MB");
      return;
    }

    setFile(selectedFile);
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const uploadFile = async () => {
    if (!file) return;

    try {
      setStep("uploading");
      setError(null);

      // Step 1: Create upload intent
      const intentRes = await fetch("/api/lms/media/upload-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          mimeType: file.type,
          fileSizeBytes: file.size,
          category: "cover",
        }),
      });

      if (!intentRes.ok) {
        const err = await intentRes.json();
        throw new Error(err.error || "Failed to create upload intent");
      }

      const { intentId, presignedUrl, mediaId } = await intentRes.json();

      // Step 2: Upload to R2 using presigned URL
      setStep("uploading");
      const uploadRes = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload file to storage");
      }

      const etag = uploadRes.headers.get("etag") || "";

      // Step 3: Verify upload
      setStep("verifying");
      const completeRes = await fetch("/api/lms/media/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intentId,
          r2Etag: etag,
          verified: true,
        }),
      });

      if (!completeRes.ok) {
        const err = await completeRes.json();
        throw new Error(err.error || "Failed to verify upload");
      }

      // Step 4: Attach to course
      setStep("attaching");
      const attachRes = await fetch(`/api/lms/courses/${courseId}/cover`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaId }),
      });

      if (!attachRes.ok) {
        const err = await attachRes.json();
        throw new Error(err.error || "Failed to attach cover to course");
      }

      // Complete
      setStep("complete");
      onUploadComplete?.(mediaId);

      // Reset after 2 seconds
      setTimeout(() => {
        setFile(null);
        setPreviewUrl(null);
        setStep("idle");
      }, 2000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message);
      setStep("idle");
    }
  };

  const progress = {
    idle: 0,
    uploading: 50,
    verifying: 75,
    attaching: 100,
    complete: 100,
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!previewUrl ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add("border-blue-400", "bg-blue-500/5");
          }}
          onDragLeave={(e) => {
            e.currentTarget.classList.remove("border-blue-400", "bg-blue-500/5");
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove("border-blue-400", "bg-blue-500/5");
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile) handleFileSelect(droppedFile);
          }}
          className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-white/40 hover:bg-white/5 transition"
        >
          <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <p className="text-lg font-semibold text-white mb-2">Drop your course cover image</p>
          <p className="text-sm text-gray-400">or click to browse (max 12MB)</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Upload progress</span>
              <span className="text-blue-400">{progress[step]}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300"
                style={{ width: `${progress[step]}%` }}
              />
            </div>
          </div>

          {/* Step indicator */}
          <div className="text-sm text-gray-400 text-center">
            {step === "idle" && "Ready to upload"}
            {step === "uploading" && "Uploading to storage..."}
            {step === "verifying" && "Verifying upload..."}
            {step === "attaching" && "Attaching to course..."}
            {step === "complete" && "✓ Upload complete!"}
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          {step === "idle" && (
            <div className="flex gap-3">
              <button
                onClick={uploadFile}
                disabled={step !== "idle"}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                Upload Cover
              </button>
              <button
                onClick={() => {
                  setFile(null);
                  setPreviewUrl(null);
                }}
                className="px-4 py-2 rounded-lg border border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {step !== "idle" && step !== "complete" && (
            <div className="flex items-center justify-center gap-2 py-2 text-blue-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Processing...</span>
            </div>
          )}

          {step === "complete" && (
            <div className="flex items-center justify-center gap-2 py-2 text-green-400">
              <Check className="w-4 h-4" />
              <span className="text-sm">Course cover updated successfully</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
