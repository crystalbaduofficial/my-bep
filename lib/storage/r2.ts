import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl as getS3SignedUrl } from "@aws-sdk/s3-request-presigner";

interface PresignedUrlParams {
  bucket: string;
  key: string;
  method: "PUT" | "GET";
  expiresIn: number; // seconds
  contentType?: string;
}

interface VerifyUploadParams {
  bucket: string;
  key: string;
  expectedSize: number;
}

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "",
  },
});

/**
 * Generate a presigned URL for direct R2 upload/download
 * Uses AWS Signature V4
 */
export async function generatePresignedUrl(params: PresignedUrlParams): Promise<string> {
  const { bucket, key, method, expiresIn, contentType } = params;

  try {
    if (method === "PUT") {
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        ContentType: contentType,
      });

      const signedUrl = await getS3SignedUrl(s3Client, command, {
        expiresIn,
      });

      return signedUrl;
    } else if (method === "GET") {
      // For GET, we need to construct the signed URL using the endpoint
      const endpoint = process.env.CLOUDFLARE_R2_ENDPOINT || "";
      const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "";
      const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "";

      // Create a GetObjectCommand for signing
      const { GetObjectCommand } = await import("@aws-sdk/client-s3");
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      });

      const signedUrl = await getS3SignedUrl(s3Client, command, {
        expiresIn,
      });

      return signedUrl;
    }

    throw new Error("Invalid method");
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw new Error("Failed to generate presigned URL");
  }
}

/**
 * Verify that a file was successfully uploaded to R2
 */
export async function verifyUploadToR2(params: VerifyUploadParams): Promise<boolean> {
  const { bucket, key, expectedSize } = params;

  try {
    const command = new HeadObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const response = await s3Client.send(command);

    // Verify the file size matches
    if (response.ContentLength !== expectedSize) {
      console.warn(
        `File size mismatch: expected ${expectedSize}, got ${response.ContentLength}`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error verifying upload:", error);
    return false;
  }
}

/**
 * Delete a file from R2
 */
export async function deleteFromR2(bucket: string, key: string): Promise<boolean> {
  try {
    const { DeleteObjectCommand } = await import("@aws-sdk/client-s3");
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error("Error deleting from R2:", error);
    return false;
  }
}

/**
 * Get public URL for a media asset (for displaying covers)
 */
export function getPublicMediaUrl(key: string): string {
  const baseUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL || "";
  if (!baseUrl) {
    throw new Error("CLOUDFLARE_R2_PUBLIC_URL not configured");
  }
  return `${baseUrl}/${key}`;
}
