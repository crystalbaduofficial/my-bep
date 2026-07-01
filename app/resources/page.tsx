import Link from "next/link";
import { Section } from "@/components/Section";
import { FileText, BookOpen, HelpCircle, Zap } from "lucide-react";

export const metadata = {
  title: "Resources - Backflow Exam Prep",
  description: "Learning materials, guides, and support resources for backflow certification.",
};

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <Section className="text-center py-32">
        <h1 className="heading-1 mb-6">
          Learning Resources & Support
        </h1>
        <p className="subtext max-w-2xl mx-auto mb-8">
          Everything you need to succeed in your backflow certification journey.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-lg border border-white/20 text-white font-semibold hover:border-white/40 hover:bg-white/5 transition"
        >
          Back to Home
        </Link>
      </Section>

      {/* Resource Categories */}
      <Section
        subtitle="Available Resources"
        title="Find What You Need"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="premium-card">
            <FileText size={28} className="text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Study Guides</h3>
            <p className="text-sm text-gray-400">Comprehensive study materials for each topic</p>
          </div>
          <div className="premium-card">
            <BookOpen size={28} className="text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Video Tutorials</h3>
            <p className="text-sm text-gray-400">Expert-led video explanations</p>
          </div>
          <div className="premium-card">
            <HelpCircle size={28} className="text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Help Center</h3>
            <p className="text-sm text-gray-400">
              <a href="https://help.backflowexamprep.com" className="text-blue-400 hover:text-blue-300">
                Visit Help Center
              </a>
            </p>
          </div>
          <div className="premium-card">
            <Zap size={28} className="text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Quick Tips</h3>
            <p className="text-sm text-gray-400">Quick reference guides and checklists</p>
          </div>
        </div>
      </Section>

      {/* External Resources */}
      <Section
        subtitle="External Resources"
        title="Additional Help"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <a
            href="https://help.backflowexamprep.com"
            className="premium-card block"
          >
            <h3 className="text-lg font-semibold mb-2 text-blue-400">Help Center</h3>
            <p className="text-sm text-gray-400">Get answers to common questions</p>
          </a>
          <a
            href="https://docs.backflowexamprep.com"
            className="premium-card block"
          >
            <h3 className="text-lg font-semibold mb-2 text-blue-400">Documentation</h3>
            <p className="text-sm text-gray-400">Technical guides and API docs</p>
          </a>
          <a
            href="https://status.backflowexamprep.com"
            className="premium-card block"
          >
            <h3 className="text-lg font-semibold mb-2 text-blue-400">Status Page</h3>
            <p className="text-sm text-gray-400">System status and updates</p>
          </a>
        </div>
      </Section>

      {/* CTA */}
      <Section centered={true} className="mb-0">
        <div className="max-w-2xl mx-auto premium-card text-center">
          <h2 className="heading-2 mb-4">Need more help?</h2>
          <p className="subtext mb-8">
            Contact our support team for personalized assistance.
          </p>
          <a
            href="https://help.backflowexamprep.com/contact"
            className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            Contact Support
          </a>
        </div>
      </Section>
    </>
  );
}
