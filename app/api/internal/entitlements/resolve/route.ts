import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    // Verify API key for internal use only
    const auth = request.headers.get("authorization");
    if (!auth?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKey = auth.slice(7);
    if (apiKey !== process.env.SSO_API_KEY) {
      return NextResponse.json({ error: "Invalid key" }, { status: 401 });
    }

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    // Get license
    const licenseResult = await pool.query(
      "SELECT * FROM shop.license WHERE user_id = $1",
      [userId]
    );

    const license = licenseResult.rows[0];

    if (!license || license.status !== "active") {
      // Default to free tier
      return NextResponse.json({
        planId: "free",
        canAccessSimulator: true,
        canAccessCoursesFeature: true,
        canAccessMessaging: false,
        canAccessAssignments: false,
        canCreateCourses: false,
        canManageTeam: false,
        canAccessReports: false,
        canAccessWhiteLabel: false,
        canAccessApiAccess: false,
        seatLimit: 1,
        seatsUsed: 1,
        entitlements: {},
      });
    }

    // Define feature access by plan
    const featureMap: Record<string, Record<string, boolean>> = {
      free: {
        canAccessSimulator: true,
        canAccessCoursesFeature: true,
        canAccessMessaging: false,
        canAccessAssignments: false,
        canCreateCourses: false,
        canManageTeam: false,
        canAccessReports: false,
        canAccessWhiteLabel: false,
        canAccessApiAccess: false,
      },
      student: {
        canAccessSimulator: true,
        canAccessCoursesFeature: true,
        canAccessMessaging: true,
        canAccessAssignments: true,
        canCreateCourses: false,
        canManageTeam: false,
        canAccessReports: false,
        canAccessWhiteLabel: false,
        canAccessApiAccess: false,
      },
      instructor: {
        canAccessSimulator: true,
        canAccessCoursesFeature: true,
        canAccessMessaging: true,
        canAccessAssignments: true,
        canCreateCourses: true,
        canManageTeam: true,
        canAccessReports: true,
        canAccessWhiteLabel: false,
        canAccessApiAccess: false,
      },
      organization: {
        canAccessSimulator: true,
        canAccessCoursesFeature: true,
        canAccessMessaging: true,
        canAccessAssignments: true,
        canCreateCourses: true,
        canManageTeam: true,
        canAccessReports: true,
        canAccessWhiteLabel: true,
        canAccessApiAccess: false,
      },
      enterprise: {
        canAccessSimulator: true,
        canAccessCoursesFeature: true,
        canAccessMessaging: true,
        canAccessAssignments: true,
        canCreateCourses: true,
        canManageTeam: true,
        canAccessReports: true,
        canAccessWhiteLabel: true,
        canAccessApiAccess: true,
      },
    };

    const features = featureMap[license.plan_name] || featureMap.free;

    // Get entitlements
    const entitlementsResult = await pool.query(
      "SELECT entitlement_key, value FROM shop.entitlement WHERE license_id = $1",
      [license.id]
    );

    const entitlements: Record<string, any> = {};
    for (const row of entitlementsResult.rows) {
      entitlements[row.entitlement_key] = row.value;
    }

    return NextResponse.json({
      planId: license.plan_name,
      licenseId: license.id,
      ...features,
      seatLimit: license.plan_name === "free" ? 1 : 50,
      seatsUsed: 1,
      entitlements,
      expiresAt: license.current_period_end,
    });
  } catch (error) {
    console.error("Entitlements error:", error);
    return NextResponse.json(
      { error: "Failed to resolve entitlements" },
      { status: 500 }
    );
  }
}
