import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { pool } from "@/lib/db";
import { logAuditEvent } from "@/lib/audit/logger";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-06-24.dahlia",
    })
  : null;

export async function POST(request: NextRequest) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    ) as Stripe.Event;

    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutComplete(event.data.object as Stripe.Checkout.Session);
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdate(event.data.object as Stripe.Subscription);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionCanceled(event.data.object as Stripe.Subscription);
        break;

      case "invoice.payment_succeeded":
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 500 }
    );
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const metadata = session.metadata || {};
  const userId = metadata.userId;
  const planId = metadata.planId;
  const workspaceId = metadata.workspaceId !== "personal" ? metadata.workspaceId : null;

  if (!userId || !planId) {
    console.error("Missing userId or planId in metadata");
    return;
  }

  const today = new Date();
  const nextMonth = new Date(today.setMonth(today.getMonth() + 1));

  const result = await pool.query(
    `INSERT INTO shop.license (user_id, workspace_id, plan_name, status, stripe_subscription_id, current_period_end)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id`,
    [
      userId,
      workspaceId,
      planId,
      "active",
      session.subscription,
      nextMonth.toISOString(),
    ]
  );

  await pool.query(
    `INSERT INTO shop.webhook_event (stripe_event_id, event_type, data, processed)
     VALUES ($1, $2, $3, true)`,
    [session.id, "checkout.session.completed", JSON.stringify(session)]
  );

  await logAuditEvent({
    actor_id: userId,
    action: "payment.succeeded",
    resource_type: "license",
    resource_id: result.rows[0].id,
    ip_address: "webhook",
    user_agent: "stripe",
    status: "success",
  });
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const status = subscription.status === "active" ? "active" : "inactive";
  const currentPeriodEnd =
    typeof (subscription as any).current_period_end === "number"
      ? new Date((subscription as any).current_period_end * 1000)
      : null;

  await pool.query(
    `UPDATE shop.license
     SET status = $1, current_period_end = $2
     WHERE stripe_subscription_id = $3`,
    [status, currentPeriodEnd, subscription.id]
  );
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  await pool.query(
    `UPDATE shop.license
     SET status = 'canceled'
     WHERE stripe_subscription_id = $1`,
    [subscription.id]
  );
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscriptionId = (invoice as any).subscription as string;

  const result = await pool.query(
    `SELECT user_id FROM shop.license WHERE stripe_subscription_id = $1`,
    [subscriptionId]
  );

  if (result.rows.length > 0) {
    await logAuditEvent({
      actor_id: result.rows[0].user_id,
      action: "payment.succeeded",
      resource_type: "invoice",
      resource_id: invoice.id,
      ip_address: "webhook",
      user_agent: "stripe",
      status: "success",
    });
  }
}
