import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/billing/stripe";
import { pool } from "@/lib/db";
import { logAuditEvent } from "@/lib/audit/logger";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") || "";

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err) {
    console.error(
      "Webhook signature verification failed:",
      err instanceof Error ? err.message : err
    );
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    // Log webhook event
    const logResult = await pool.query(
      `INSERT INTO shop.webhook_event (stripe_event_id, event_type, data, processed)
       VALUES ($1, $2, $3, false)`,
      [event.id, event.type, JSON.stringify(event.data)]
    );

    const webhookEventId = logResult.rows[0]?.id;

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as any;
        const userId = subscription.metadata?.userId;

        if (!userId) {
          console.warn(
            "Subscription event missing userId in metadata:",
            subscription.id
          );
          break;
        }

        const planId = subscription.metadata?.planId;
        const subscriptionId = subscription.id;
        const currentPeriodEnd = new Date(
          subscription.current_period_end * 1000
        );

        // Create or update license
        const existingLicense = await pool.query(
          "SELECT id FROM shop.license WHERE user_id = $1",
          [userId]
        );

        if (existingLicense.rows.length > 0) {
          await pool.query(
            `UPDATE shop.license 
             SET plan_name = $1, stripe_subscription_id = $2, current_period_end = $3, status = 'active'
             WHERE user_id = $4`,
            [planId, subscriptionId, currentPeriodEnd, userId]
          );
        } else {
          await pool.query(
            `INSERT INTO shop.license (user_id, plan_name, stripe_subscription_id, current_period_end, status)
             VALUES ($1, $2, $3, $4, 'active')`,
            [userId, planId, subscriptionId, currentPeriodEnd]
          );
        }

        // Log audit event
        await logAuditEvent({
          actor_id: userId,
          action: "payment.succeeded",
          resource_type: "billing",
          resource_id: subscriptionId,
          ip_address: "stripe",
          user_agent: "stripe-webhook",
          status: "success",
          metadata: { subscriptionId, planId },
        });

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as any;
        const userId = subscription.metadata?.userId;

        if (!userId) break;

        // Deactivate license
        await pool.query(
          "UPDATE shop.license SET status = 'canceled' WHERE stripe_subscription_id = $1",
          [subscription.id]
        );

        // Log audit event
        await logAuditEvent({
          actor_id: userId,
          action: "subscription.canceled",
          resource_type: "billing",
          resource_id: subscription.id,
          ip_address: "stripe",
          user_agent: "stripe-webhook",
          status: "success",
        });

        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as any;
        console.log("Payment succeeded for invoice:", invoice.id);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as any;
        console.error("Payment failed for invoice:", invoice.id);
        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
    }

    // Mark webhook as processed
    if (webhookEventId) {
      await pool.query(
        "UPDATE shop.webhook_event SET processed = true WHERE id = $1",
        [webhookEventId]
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
