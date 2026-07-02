import { NextRequest, NextResponse } from "next/server";
import { attachClassCover } from "@/lib/lms/media-service";
import { getSession } from "@/lib/auth/session";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ classId: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { mediaId } = body;

    if (!mediaId) {
      return NextResponse.json({ error: "Missing mediaId" }, { status: 400 });
    }

    const result = await attachClassCover((await params).classId, mediaId, session.user.id);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Attach class cover error:", error);
    const message = error instanceof Error ? error.message : "Failed to attach class cover";
    const status = message === "Unauthorized" ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
