import Link from "next/link";
import { Section } from "@/components/Section";

export const metadata = {
  title: "Terms of Service - Backflow Exam Prep",
  description: "Terms and conditions for using Backflow Exam Prep",
};

export default function TermsPage() {
  return (
    <>
      <Section className="py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="heading-1 mb-8">Terms of Service</h1>

          <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
            <p>
              Please review these Terms of Service carefully before using Backflow Exam Prep. By accessing and using this platform, you agree to be bound by these terms. If you do not agree to any part of these terms, you may not use our service.
            </p>

            <h2 className="heading-2 text-xl">1. Acceptable Use</h2>
            <p>
              You agree to use this service only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of the service.
            </p>

            <h2 className="heading-2 text-xl">2. User Accounts</h2>
            <p>
              If you create an account, you are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account.
            </p>

            <h2 className="heading-2 text-xl">3. Intellectual Property</h2>
            <p>
              All content, materials, and functionality of this service are the exclusive property of Backflow Exam Prep or its content suppliers and are protected by international copyright laws.
            </p>

            <h2 className="heading-2 text-xl">4. Limitation of Liability</h2>
            <p>
              Backflow Exam Prep is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of this service.
            </p>

            <h2 className="heading-2 text-xl">5. Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the service following any such modification constitutes your acceptance of the modified terms.
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
