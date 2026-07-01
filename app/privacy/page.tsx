import Link from "next/link";
import { Section } from "@/components/Section";

export const metadata = {
  title: "Privacy Policy - Backflow Exam Prep",
  description: "Privacy policy for Backflow Exam Prep",
};

export default function PrivacyPage() {
  return (
    <>
      <Section className="py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="heading-1 mb-8">Privacy Policy</h1>

          <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
            <p>
              Backflow Exam Prep is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>

            <h2 className="heading-2 text-xl">1. Information We Collect</h2>
            <p>
              We collect information you voluntarily provide to us, such as when you create an account, make a purchase, or contact our support team. This may include your name, email, phone number, and payment information.
            </p>

            <h2 className="heading-2 text-xl">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, process transactions, send administrative information, and provide customer support.
            </p>

            <h2 className="heading-2 text-xl">3. Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="heading-2 text-xl">4. Third-Party Disclosure</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share information with service providers who assist us in operating our website and conducting our business.
            </p>

            <h2 className="heading-2 text-xl">5. Your Privacy Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise any of these rights.
            </p>

            <h2 className="heading-2 text-xl">6. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us through our{" "}
              <a href="https://help.backflowexamprep.com/contact" className="text-blue-400 hover:text-blue-300">
                contact form
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
