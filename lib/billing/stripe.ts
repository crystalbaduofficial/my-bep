import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

export const PLANS = {
  free: {
    id: "free",
    name: "Free",
    price: 0,
    features: [
      "Access to simulator",
      "Course enrollment",
      "Basic progress tracking",
    ],
    limits: {
      courses: -1,
      students: 1,
      simulatorSessions: 10,
    },
  },
  student: {
    id: "student",
    name: "Student",
    price: 2999, // $29.99/month
    stripe_price_id: "price_student_monthly",
    features: [
      "Everything in Free",
      "Unlimited simulator sessions",
      "Course assignments",
      "Messaging",
      "Progress reports",
    ],
    limits: {
      courses: -1,
      students: 1,
      simulatorSessions: -1,
    },
  },
  student_pro: {
    id: "student_pro",
    name: "Student Pro",
    price: 4999, // $49.99/month
    stripe_price_id: "price_student_pro_monthly",
    features: [
      "Everything in Student",
      "Priority support",
      "Personalized learning paths",
      "Advanced analytics",
    ],
    limits: {
      courses: -1,
      students: 1,
      simulatorSessions: -1,
    },
  },
  instructor: {
    id: "instructor",
    name: "Instructor",
    price: 9999, // $99.99/month
    stripe_price_id: "price_instructor_monthly",
    features: [
      "Everything in Student Pro",
      "Create and manage courses",
      "Manage students",
      "Grading tools",
      "Class reports",
    ],
    limits: {
      courses: -1,
      students: 50,
      simulatorSessions: -1,
    },
  },
  organization: {
    id: "organization",
    name: "Organization",
    price: 29999, // $299.99/month
    stripe_price_id: "price_organization_monthly",
    features: [
      "Everything in Instructor",
      "Unlimited students",
      "Team management",
      "White-label options",
      "Advanced analytics",
    ],
    limits: {
      courses: -1,
      students: -1,
      simulatorSessions: -1,
    },
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    price: 99999, // $999.99/month (custom)
    features: [
      "Everything in Organization",
      "Dedicated support",
      "Custom integrations",
      "SSO",
      "API access",
    ],
    limits: {
      courses: -1,
      students: -1,
      simulatorSessions: -1,
    },
  },
};

export async function createCheckoutSession(
  userId: string,
  email: string,
  planId: string,
  workspaceId?: string
): Promise<string | null> {
  const plan = (PLANS as any)[planId];
  if (!plan || plan.price === 0) {
    return null; // Free plans don't need checkout
  }

  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan.stripe_price_id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_SHOP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SHOP_URL}/checkout/cancel`,
      metadata: {
        userId,
        planId,
        workspaceId: workspaceId || "personal",
      },
    });

    return session.url;
  } catch (error) {
    console.error("Checkout creation error:", error);
    return null;
  }
}

export async function getCheckoutSession(sessionId: string) {
  try {
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch (error) {
    console.error("Session retrieval error:", error);
    return null;
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    return await stripe.subscriptions.cancel(subscriptionId);
  } catch (error) {
    console.error("Cancellation error:", error);
    return null;
  }
}

export function validateWebhookSignature(
  body: string,
  signature: string
): boolean {
  try {
    stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
    return true;
  } catch {
    return false;
  }
}

export async function getSubscription(subscriptionId: string) {
  try {
    return await stripe.subscriptions.retrieve(subscriptionId);
  } catch (error) {
    console.error("Subscription retrieval error:", error);
    return null;
  }
}
