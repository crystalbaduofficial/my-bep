import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { createCheckoutSession } from "@/lib/billing/stripe";
import { logAuditEvent } from "@/lib/audit/logger";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planId } = await request.json();

    if (!planId) {
      return NextResponse.json(
        { error: "Plan ID is required" },
        { status: 400 }
      );
    }

    const returnUrl =
      process.env.NEXT_PUBLIC_SHOP_URL || "http://localhost:3004/billing";

    const stripeSession = await createCheckoutSession(
      session.user.id,
      session.user.email || "",
      planId,
      returnUrl
    );

    if (!stripeSession) {
      return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
    }

    // Log audit event
    await logAuditEvent({
      actor_id: session.user.id,
      action: "checkout.initiated",
      resource_type: "billing",
      resource_id: stripeSession.id,
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
      user_agent: request.headers.get("user-agent") || "unknown",
      status: "success",
      metadata: { planId, stripeSessionId: stripeSession.id },
    });

    return NextResponse.json({
      sessionUrl: stripeSession.url,
      sessionId: stripeSession.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create checkout",
      },
      { status: 500 }
    );
  }
}
