import Link from "next/link";
import { Section } from "@/components/Section";

export const metadata = {
  title: "About - Backflow Exam Prep",
  description: "Learn about Backflow Exam Prep and our mission to provide excellent certification training.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section className="text-center py-32">
        <h1 className="heading-1 mb-6">
          About Backflow Exam Prep
        </h1>
        <p className="subtext max-w-2xl mx-auto mb-8">
          Dedicated to providing professional backflow prevention training and certification resources.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-lg border border-white/20 text-white font-semibold hover:border-white/40 hover:bg-white/5 transition"
        >
          Back to Home
        </Link>
      </Section>

      {/* Mission */}
      <Section
        title="Our Mission"
        centered={true}
      >
        <div className="max-w-2xl mx-auto premium-card">
          <p className="subtext mb-6">
            Backflow Exam Prep is dedicated to making professional backflow prevention training accessible, engaging, and effective for everyone.
          </p>
          <p className="text-gray-300">
            We believe that comprehensive training leads to better preparation, higher certification rates, and safer water systems. Our platform combines expert knowledge, modern technology, and proven learning methodologies to help individuals and organizations succeed.
          </p>
        </div>
      </Section>

      {/* Values */}
      <Section
        title="Our Values"
        subtitle="What We Stand For"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="premium-card">
            <h3 className="text-lg font-semibold mb-2">Excellence</h3>
            <p className="text-sm text-gray-400">High-quality training materials and expert instruction</p>
          </div>
          <div className="premium-card">
            <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
            <p className="text-sm text-gray-400">Training solutions for everyone, everywhere</p>
          </div>
          <div className="premium-card">
            <h3 className="text-lg font-semibold mb-2">Integrity</h3>
            <p className="text-sm text-gray-400">Transparent, honest, and ethical practices</p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section centered={true} className="mb-0">
        <div className="max-w-2xl mx-auto premium-card text-center">
          <h2 className="heading-2 mb-4">Join our mission</h2>
          <p className="subtext mb-8">
            Help us prepare the next generation of certified backflow prevention professionals.
          </p>
          <a
            href="https://sso.backflowexamprep.com/sign-up"
            className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            Get Started
          </a>
        </div>
      </Section>
    </>
  );
}
