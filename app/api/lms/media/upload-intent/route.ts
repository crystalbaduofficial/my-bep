import { NextRequest, NextResponse } from "next/server";
import { createUploadIntent } from "@/lib/lms/media-service";
import { getSession } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { filename, mimeType, fileSizeBytes, category, dimensions } = body;

    if (!filename || !mimeType || !fileSizeBytes || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await createUploadIntent({
      filename,
      mimeType,
      fileSizeBytes,
      category,
      userId: session.user.id,
      dimensions,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Upload intent error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create upload intent" },
      { status: 500 }
    );
  }
}
