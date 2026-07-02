import { NextRequest, NextResponse } from "next/server";
import { completeUpload } from "@/lib/lms/media-service";
import { getSession } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { intentId, r2Etag, verified } = body;

    if (!intentId || verified === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await completeUpload({
      intentId,
      userId: session.user.id,
      r2Etag,
      verified,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Upload complete error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to complete upload" },
      { status: 500 }
    );
  }
}
