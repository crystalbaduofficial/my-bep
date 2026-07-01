import Link from "next/link";
import { Section } from "@/components/Section";
import { Lock, BarChart3, Users, Zap } from "lucide-react";

export const metadata = {
  title: "Enterprise Solutions - Backflow Exam Prep",
  description: "Scalable training solutions for large organizations with team management, analytics, and compliance.",
};

export default function EnterprisePage() {
  return (
    <>
      {/* Hero */}
      <Section className="text-center py-32">
        <h1 className="heading-1 mb-6">
          Enterprise Training for Organizations
        </h1>
        <p className="subtext max-w-2xl mx-auto mb-8">
          Scalable solutions to train and certify your entire organization. Complete team management, compliance tracking, and advanced analytics.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://sso.backflowexamprep.com/sign-up"
            className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Contact Sales
          </a>
          <Link
            href="/"
            className="px-8 py-3 rounded-lg border border-white/20 text-white font-semibold hover:border-white/40 hover:bg-white/5 transition"
          >
            Back to Home
          </Link>
        </div>
      </Section>

      {/* Features */}
      <Section
        subtitle="Enterprise Features"
        title="Built for Scale"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="premium-card">
            <Users size={28} className="text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Team Management</h3>
            <p className="text-sm text-gray-400">Manage hundreds of users and teams</p>
          </div>
          <div className="premium-card">
            <BarChart3 size={28} className="text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
            <p className="text-sm text-gray-400">Organization-wide reporting and insights</p>
          </div>
          <div className="premium-card">
            <Lock size={28} className="text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Compliance & Security</h3>
            <p className="text-sm text-gray-400">Enterprise-grade security and compliance</p>
          </div>
          <div className="premium-card">
            <Zap size={28} className="text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Custom Integration</h3>
            <p className="text-sm text-gray-400">API and white-label options</p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section centered={true} className="mb-0">
        <div className="max-w-2xl mx-auto premium-card text-center">
          <h2 className="heading-2 mb-4">Ready to scale your training?</h2>
          <p className="subtext mb-8">
            Contact our enterprise team to discuss solutions tailored to your organization.
          </p>
          <a
            href="https://sso.backflowexamprep.com/sign-up"
            className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            Schedule Demo
          </a>
        </div>
      </Section>
    </>
  );
}
