import Link from "next/link";
import { Section } from "@/components/Section";
import { PremiumCard } from "@/components/PremiumCard";
import { Zap, TrendingUp, RotateCcw, Activity } from "lucide-react";

export const metadata = {
  title: "Simulator - Backflow Exam Prep",
  description: "Practice real-world backflow scenarios and installations in our interactive simulator.",
};

export default function SimulatorPage() {
  return (
    <>
      {/* Hero */}
      <Section className="text-center py-32">
        <h1 className="heading-1 mb-6">
          Real-World Backflow Scenarios in an Interactive Simulator
        </h1>
        <p className="subtext max-w-2xl mx-auto mb-8">
          Apply what you've learned by working through realistic backflow situations. Our simulator provides hands-on practice without real-world consequences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://sso.backflowexamprep.com/sign-up"
            className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Launch Simulator
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
        subtitle="Interactive Practice"
        title="Learn by Doing"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PremiumCard
            icon={<Activity size={28} />}
            title="Realistic Scenarios"
            description="Practice common backflow prevention situations"
          />
          <PremiumCard
            icon={<TrendingUp size={28} />}
            title="Progressive Difficulty"
            description="Start basic, advance to complex installations"
          />
          <PremiumCard
            icon={<RotateCcw size={28} />}
            title="Instant Replay"
            description="Review and learn from your decisions"
          />
          <PremiumCard
            icon={<Zap size={28} />}
            title="Performance Metrics"
            description="Track your improvement over time"
          />
        </div>
      </Section>

      {/* Simulator Types */}
      <Section
        subtitle="Practice Modes"
        title="Different Scenario Types"
        description="Work through various backflow prevention situations"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Installation Scenarios",
              description: "Design and install backflow devices in different building types",
            },
            {
              title: "Testing Procedures",
              description: "Practice proper testing and certification procedures",
            },
            {
              title: "Troubleshooting",
              description: "Diagnose and fix common backflow prevention issues",
            },
            {
              title: "Compliance Challenges",
              description: "Navigate real-world code and compliance requirements",
            },
          ].map((scenario, idx) => (
            <div key={idx} className="premium-card">
              <h3 className="text-lg font-semibold mb-2">{scenario.title}</h3>
              <p className="text-sm text-gray-400">{scenario.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section
        subtitle="Why Simulation"
        title="Build Hands-On Expertise"
        centered={true}
      >
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="premium-card">
              <h3 className="font-semibold mb-3">Safe Practice Environment</h3>
              <p className="text-sm text-gray-400">Make mistakes and learn without real-world consequences</p>
            </div>
            <div className="premium-card">
              <h3 className="font-semibold mb-3">Immediate Feedback</h3>
              <p className="text-sm text-gray-400">Get instant evaluation of your decisions and actions</p>
            </div>
            <div className="premium-card">
              <h3 className="font-semibold mb-3">Unlimited Practice</h3>
              <p className="text-sm text-gray-400">Practice as many scenarios as you need without limits</p>
            </div>
            <div className="premium-card">
              <h3 className="font-semibold mb-3">Expert Guidance</h3>
              <p className="text-sm text-gray-400">Learn from expert explanations of each scenario</p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section centered={true} className="mb-0">
        <div className="max-w-2xl mx-auto premium-card text-center">
          <h2 className="heading-2 mb-4">Ready to practice?</h2>
          <p className="subtext mb-8">
            Experience real-world backflow scenarios in our interactive simulator.
          </p>
          <a
            href="https://sso.backflowexamprep.com/sign-up"
            className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            Start Simulator
          </a>
        </div>
      </Section>
    </>
  );
}
