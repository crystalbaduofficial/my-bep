import Link from "next/link";
import { Section } from "@/components/Section";
import { Users, TrendingUp, BarChart3, Lock } from "lucide-react";

export const metadata = {
  title: "Organizations - Backflow Exam Prep",
  description: "Team training solutions designed for organizations and municipal governments.",
};

export default function OrganizationsPage() {
  return (
    <>
      {/* Hero */}
      <Section className="text-center py-32">
        <h1 className="heading-1 mb-6">
          Training Solutions for Organizations
        </h1>
        <p className="subtext max-w-2xl mx-auto mb-8">
          Streamline backflow certification training for your team. Built-in team management, progress tracking, and compliance reporting.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://sso.backflowexamprep.com/sign-up"
            className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Get Started
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
        subtitle="Organization Features"
        title="Manage Team Training"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="premium-card">
            <Users size={28} className="text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Team Enrollment</h3>
            <p className="text-sm text-gray-400">Bulk invite team members and assign roles</p>
          </div>
          <div className="premium-card">
            <TrendingUp size={28} className="text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
            <p className="text-sm text-gray-400">Monitor team certification progress</p>
          </div>
          <div className="premium-card">
            <BarChart3 size={28} className="text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Compliance Reports</h3>
            <p className="text-sm text-gray-400">Generate certification compliance reports</p>
          </div>
          <div className="premium-card">
            <Lock size={28} className="text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Admin Controls</h3>
            <p className="text-sm text-gray-400">Manage permissions and team settings</p>
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section
        subtitle="Why Organizations Choose Us"
        title="Organization Benefits"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="premium-card">
            <h3 className="text-lg font-semibold mb-3">Centralized Management</h3>
            <p className="text-sm text-gray-400">Manage all team training from one platform</p>
          </div>
          <div className="premium-card">
            <h3 className="text-lg font-semibold mb-3">Cost Savings</h3>
            <p className="text-sm text-gray-400">Volume pricing and flexible billing options</p>
          </div>
          <div className="premium-card">
            <h3 className="text-lg font-semibold mb-3">Dedicated Support</h3>
            <p className="text-sm text-gray-400">Priority support for your organization</p>
          </div>
          <div className="premium-card">
            <h3 className="text-lg font-semibold mb-3">Custom Solutions</h3>
            <p className="text-sm text-gray-400">Tailored programs for your needs</p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section centered={true} className="mb-0">
        <div className="max-w-2xl mx-auto premium-card text-center">
          <h2 className="heading-2 mb-4">Ready to train your team?</h2>
          <p className="subtext mb-8">
            Set up your organization and start managing your team's certification training today.
          </p>
          <a
            href="https://sso.backflowexamprep.com/sign-up"
            className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            Create Organization
          </a>
        </div>
      </Section>
    </>
  );
}
