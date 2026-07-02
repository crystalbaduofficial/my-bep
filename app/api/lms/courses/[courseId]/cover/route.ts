import { NextRequest, NextResponse } from "next/server";
import { attachCourseCover } from "@/lib/lms/media-service";
import { getSession } from "@/lib/auth/session";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
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

    const result = await attachCourseCover((await params).courseId, mediaId, session.user.id);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Attach course cover error:", error);
    const message = error instanceof Error ? error.message : "Failed to attach course cover";
    const status = message === "Unauthorized" ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
