import Link from "next/link";
import { Section } from "@/components/Section";

export const metadata = {
  title: "Refund Policy - Backflow Exam Prep",
  description: "Refund policy for Backflow Exam Prep",
};

export default function RefundPolicyPage() {
  return (
    <>
      <Section className="py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="heading-1 mb-8">Refund Policy</h1>

          <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
            <p>
              At Backflow Exam Prep, we stand behind the quality of our training platform and materials. This Refund Policy explains our refund terms and procedures.
            </p>

            <h2 className="heading-2 text-xl">1. 30-Day Money-Back Guarantee</h2>
            <p>
              We offer a 30-day money-back guarantee for all course subscriptions and purchases. If you are not satisfied with our service within 30 days of purchase, you can request a full refund.
            </p>

            <h2 className="heading-2 text-xl">2. How to Request a Refund</h2>
            <p>
              To request a refund, please contact our support team at{" "}
              <a href="https://help.backflowexamprep.com/contact" className="text-blue-400 hover:text-blue-300">
                help.backflowexamprep.com/contact
              </a>
              {" "}with your order details and reason for the refund request.
            </p>

            <h2 className="heading-2 text-xl">3. Refund Processing</h2>
            <p>
              Approved refunds will be processed within 5-10 business days and returned to the original payment method used at the time of purchase.
            </p>

            <h2 className="heading-2 text-xl">4. Non-Refundable Items</h2>
            <p>
              Some items may not be refundable, including but not limited to digital downloads already accessed, custom projects, or services provided. Please contact us for details about specific purchases.
            </p>

            <h2 className="heading-2 text-xl">5. Subscription Cancellations</h2>
            <p>
              You can cancel your subscription at any time. Upon cancellation, you will retain access to your account until the end of your current billing period.
            </p>

            <h2 className="heading-2 text-xl">6. Contact Support</h2>
            <p>
              For questions about our refund policy, please contact our support team through our{" "}
              <a href="https://help.backflowexamprep.com" className="text-blue-400 hover:text-blue-300">
                help center
              </a>
              .
            </p>

            <p className="mt-8 text-gray-500 text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Link
            href="/"
            className="inline-block mt-12 px-8 py-3 rounded-lg border border-white/20 text-white font-semibold hover:border-white/40 hover:bg-white/5 transition"
          >
            Back to Home
          </Link>
        </div>
      </Section>
    </>
  );
}
