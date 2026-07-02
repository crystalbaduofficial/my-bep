import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { pool } from "@/lib/db";
import { stripe } from "@/lib/billing/stripe";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get license
    const licenseResult = await pool.query(
      "SELECT * FROM shop.license WHERE user_id = $1",
      [session.user.id]
    );

    const license = licenseResult.rows[0] || null;

    // Get invoices from Stripe if subscription exists
    let invoices = [];
    if (license?.stripe_subscription_id) {
      try {
        const stripeInvoices = await stripe.invoices.list({
          subscription: license.stripe_subscription_id,
          limit: 12,
        });

        invoices = stripeInvoices.data.map((inv) => ({
          id: inv.id,
          amount: inv.total || 0,
          status: inv.status,
          date: new Date(inv.created * 1000).toISOString(),
        }));
      } catch (err) {
        console.error("Failed to fetch Stripe invoices:", err);
      }
    }

    return NextResponse.json({
      license,
      invoices,
    });
  } catch (error) {
    console.error("Billing info error:", error);
    return NextResponse.json(
      { error: "Failed to fetch billing info" },
      { status: 500 }
    );
  }
}
