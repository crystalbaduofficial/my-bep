import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { pool } from "@/lib/db";
import { logAuditEvent } from "@/lib/audit/logger";
import crypto from "crypto";

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Get workspace
    const workspaceResult = await pool.query(
      "SELECT id FROM workspaces.workspace WHERE slug = $1",
      [params.slug]
    );

    if (workspaceResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Workspace not found" },
        { status: 404 }
      );
    }

    const workspaceId = workspaceResult.rows[0].id;

    // Check if user is admin
    const memberResult = await pool.query(
      "SELECT role FROM workspaces.membership WHERE workspace_id = $1 AND user_id = $2",
      [workspaceId, session.user.id]
    );

    if (memberResult.rows.length === 0 || memberResult.rows[0].role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Create invitation
    const invitationCode = crypto.randomBytes(32).toString("hex");

    const invResult = await pool.query(
      `INSERT INTO workspaces.invitation (workspace_id, code, created_by, max_uses, expires_at)
       VALUES ($1, $2, $3, 1, NOW() + INTERVAL '7 days')
       RETURNING *`,
      [workspaceId, invitationCode, session.user.id]
    );

    await logAuditEvent({
      actor_id: session.user.id,
      action: "workspace.member_invited",
      resource_type: "workspace",
      resource_id: workspaceId,
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
      user_agent: request.headers.get("user-agent") || "unknown",
      status: "success",
      changes: { email },
    });

    return NextResponse.json({
      success: true,
      invitationCode,
      inviteUrl: `${process.env.NEXT_PUBLIC_WORKSPACES_URL}/join/${invitationCode}`,
    });
  } catch (error) {
    console.error("Invitation error:", error);
    return NextResponse.json(
      { error: "Failed to create invitation" },
      { status: 500 }
    );
  }
}
