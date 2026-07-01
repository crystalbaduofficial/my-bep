import React from "react";
import Link from "next/link";
import GlassCard from "./GlassCard";

export default function ProductOverview() {
  const features = [
    {
      icon: "⏱️",
      title: "Timed Practice Tests",
      description:
        "Real-time exams with pressure-test scenarios. Build speed and accuracy under exam conditions.",
      href: "https://learn.backflowexamprep.com/practice",
    },
    {
      icon: "📝",
      title: "Notes for Easy Recall",
      description:
        "Smart highlighting and note-taking. AI-powered summaries help you remember what matters most.",
      href: "https://learn.backflowexamprep.com/notes",
    },
    {
      icon: "📱",
      title: "Mobile Support",
      description:
        "Learn anywhere. Full-featured mobile app syncs across devices. Practice offline, review anytime.",
      href: "https://mobile.backflowexamprep.com",
    },
    {
      icon: "📊",
      title: "Advanced Analytics Engine",
      description:
        "AI that learns with you. Personalized recommendations, weakness detection, mastery tracking.",
      href: "https://analytics.backflowexamprep.com/dashboard",
    },
  ];

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="heading-2 mb-4 text-white">Powerful Learning Features</h2>
        <p className="subtext max-w-2xl mx-auto">
          Everything you need to master backflow certification with modern tools
          that actually work.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, idx) => (
          <a
            key={feature.href}
            href={feature.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              animation: `fade-in-up 0.8s ease-out ${0.1 * (idx + 1)}s both`,
            }}
          >
            <GlassCard className="h-full cursor-pointer group">
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-secondary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-secondary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                Explore <span className="text-lg">→</span>
              </div>
            </GlassCard>
          </a>
        ))}
      </div>
    </section>
  );
}
