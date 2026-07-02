import { NextRequest, NextResponse } from "next/server";
import { getSignedUrl } from "@/lib/lms/media-service";
import { getSession } from "@/lib/auth/session";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const expiresIn = req.nextUrl.searchParams.get("expiresIn")
      ? parseInt(req.nextUrl.searchParams.get("expiresIn")!)
      : 900;

    const result = await getSignedUrl({
      mediaId: id,
      userId: session.user.id,
      expiresIn: Math.min(expiresIn, 3600), // Max 1 hour
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Signed URL error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate signed URL";
    const status = message === "Unauthorized" ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
