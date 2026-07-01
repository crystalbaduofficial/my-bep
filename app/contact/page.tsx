import Link from "next/link";
import { Section } from "@/components/Section";
import { Mail, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact - Backflow Exam Prep",
  description: "Get in touch with our support team for questions or assistance.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <Section className="text-center py-32">
        <h1 className="heading-1 mb-6">
          Get in Touch
        </h1>
        <p className="subtext max-w-2xl mx-auto mb-8">
          Have questions? We're here to help.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-lg border border-white/20 text-white font-semibold hover:border-white/40 hover:bg-white/5 transition"
        >
          Back to Home
        </Link>
      </Section>

      {/* Contact Methods */}
      <Section
        title="Contact Us"
        subtitle="Multiple Ways to Reach Us"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <a
            href="https://help.backflowexamprep.com/contact"
            className="premium-card block text-center"
          >
            <Mail size={32} className="text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-gray-400 mb-4">Send us an email and we'll respond within 24 hours</p>
            <span className="text-blue-400 text-sm font-medium">Contact Form →</span>
          </a>

          <a
            href="https://help.backflowexamprep.com"
            className="premium-card block text-center"
          >
            <MessageCircle size={32} className="text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Help Center</h3>
            <p className="text-sm text-gray-400 mb-4">Browse our help documentation and FAQs</p>
            <span className="text-blue-400 text-sm font-medium">Visit Help →</span>
          </a>

          <a
            href="https://status.backflowexamprep.com"
            className="premium-card block text-center"
          >
            <Mail size={32} className="text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">System Status</h3>
            <p className="text-sm text-gray-400 mb-4">Check our status page for any service updates</p>
            <span className="text-blue-400 text-sm font-medium">Status Page →</span>
          </a>
        </div>
      </Section>

      {/* CTA */}
      <Section centered={true} className="mb-0">
        <div className="max-w-2xl mx-auto premium-card text-center">
          <h2 className="heading-2 mb-4">Ready to get started?</h2>
          <p className="subtext mb-8">
            Have a specific question? Our support team is ready to help.
          </p>
          <a
            href="https://help.backflowexamprep.com/contact"
            className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            Send Message
          </a>
        </div>
      </Section>
    </>
  );
}
