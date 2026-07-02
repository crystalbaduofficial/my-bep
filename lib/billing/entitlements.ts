import { pool } from "@/lib/db";
import { PLANS } from "./stripe";

export interface Entitlements {
  plan: string;
  canAccessSimulator: boolean;
  canAccessCourses: boolean;
  canAccessMessaging: boolean;
  canAccessAssignments: boolean;
  canCreateCourses: boolean;
  canManageTeam: boolean;
  canAccessReports: boolean;
  canAccessWhiteLabel: boolean;
  canAccessApiAccess: boolean;
  seatLimit: number;
  seatsUsed: number;
  seatsAvailable: number;
  isTrialing: boolean;
  trialDaysRemaining: number;
  isActive: boolean;
  expiresAt?: string;
}

export async function resolveEntitlements(
  userId: string,
  workspaceId?: string
): Promise<Entitlements> {
  try {
    // Get active license
    const result = await pool.query(
      `SELECT * FROM shop.license 
       WHERE user_id = $1 AND (workspace_id = $2 OR workspace_id IS NULL)
       AND status = 'active'
       ORDER BY updated_at DESC
       LIMIT 1`,
      [userId, workspaceId || null]
    );

    if (result.rows.length === 0) {
      // No active license, user has free plan
      return buildEntitlements("free", null);
    }

    const license = result.rows[0];
    const plan = (PLANS as any)[license.plan_name];

    if (!plan) {
      return buildEntitlements("free", null);
    }

    // Get seat usage if applicable
    let seatsUsed = 0;
    if (license.plan_name !== "free") {
      const seatResult = await pool.query(
        "SELECT COUNT(*) as count FROM shop.seat WHERE license_id = $1 AND status = 'active'",
        [license.id]
      );
      seatsUsed = parseInt(seatResult.rows[0].count);
    }

    return buildEntitlements(license.plan_name, license, seatsUsed);
  } catch (error) {
    console.error("Entitlements resolution error:", error);
    return buildEntitlements("free", null);
  }
}

function buildEntitlements(
  planId: string,
  license: any,
  seatsUsed: number = 0
): Entitlements {
  const plan = (PLANS as any)[planId];
  const baseEntitlements: Entitlements = {
    plan: planId,
    canAccessSimulator: false,
    canAccessCourses: false,
    canAccessMessaging: false,
    canAccessAssignments: false,
    canCreateCourses: false,
    canManageTeam: false,
    canAccessReports: false,
    canAccessWhiteLabel: false,
    canAccessApiAccess: false,
    seatLimit: plan?.limits?.students || 1,
    seatsUsed,
    seatsAvailable: (plan?.limits?.students || 1) - seatsUsed,
    isTrialing: license?.trial_ends_at ? new Date(license.trial_ends_at) > new Date() : false,
    trialDaysRemaining: license?.trial_ends_at
      ? Math.ceil(
          (new Date(license.trial_ends_at).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        )
      : 0,
    isActive: license?.status === "active",
    expiresAt: license?.current_period_end,
  };

  // Determine access based on plan
  switch (planId) {
    case "free":
      baseEntitlements.canAccessSimulator = true;
      baseEntitlements.canAccessCourses = true;
      break;

    case "student":
    case "student_pro":
      baseEntitlements.canAccessSimulator = true;
      baseEntitlements.canAccessCourses = true;
      baseEntitlements.canAccessMessaging = true;
      baseEntitlements.canAccessAssignments = true;
      break;

    case "instructor":
      baseEntitlements.canAccessSimulator = true;
      baseEntitlements.canAccessCourses = true;
      baseEntitlements.canAccessMessaging = true;
      baseEntitlements.canAccessAssignments = true;
      baseEntitlements.canCreateCourses = true;
      baseEntitlements.canAccessReports = true;
      break;

    case "organization":
      baseEntitlements.canAccessSimulator = true;
      baseEntitlements.canAccessCourses = true;
      baseEntitlements.canAccessMessaging = true;
      baseEntitlements.canAccessAssignments = true;
      baseEntitlements.canCreateCourses = true;
      baseEntitlements.canAccessReports = true;
      baseEntitlements.canManageTeam = true;
      baseEntitlements.canAccessWhiteLabel = true;
      break;

    case "enterprise":
      baseEntitlements.canAccessSimulator = true;
      baseEntitlements.canAccessCourses = true;
      baseEntitlements.canAccessMessaging = true;
      baseEntitlements.canAccessAssignments = true;
      baseEntitlements.canCreateCourses = true;
      baseEntitlements.canAccessReports = true;
      baseEntitlements.canManageTeam = true;
      baseEntitlements.canAccessWhiteLabel = true;
      baseEntitlements.canAccessApiAccess = true;
      break;
  }

  return baseEntitlements;
}
