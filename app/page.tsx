import Link from "next/link";
import { Section } from "@/components/Section";
import { PremiumCard } from "@/components/PremiumCard";
import { BookOpen, Zap, Microscope, Users } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden px-4 pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div className="home-hero-panel space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200">
              Professional Backflow Training
            </div>

            <div className="space-y-6">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
                Backflow training, practice, and simulation in one polished platform.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                Guided lessons, realistic simulator practice, practice exams, and organization tools
                in a single launch-ready experience.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://sso.backflowexamprep.com/sign-up"
                className="btn-home-primary"
              >
                Start Learning
              </a>
              <Link href="/learning-center" className="btn-home-secondary">
                Explore Platform
              </Link>
              <a
                href="https://shop.backflowexamprep.com/pricing"
                className="btn-home-tertiary"
              >
                View Plans
              </a>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-slate-400">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                No credit card required
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Free 7-day trial
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Mobile-ready learning
              </span>
            </div>
          </div>

          <div className="home-hero-art">
            <div className="home-hero-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
                    Product Preview
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Study flow that feels finished
                  </h2>
                </div>
                <div className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                  Live
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                {[
                  ["Learning Center", "Structured lessons, notes, and review."],
                  ["Simulator", "Scenario practice with realistic outcomes."],
                  ["Practice Exams", "Timed readiness checks and feedback."],
                  ["Organizations", "Team controls, reporting, and training."],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4">
                    <p className="text-lg font-medium text-white">{title}</p>
                    <p className="mt-1 text-sm text-slate-400">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Cards Section */}
      <Section
        subtitle="Core Platform"
        title="Everything You Need to Succeed"
        description="Comprehensive tools designed for backflow certification preparation"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PremiumCard
            icon={<BookOpen size={28} />}
            title="Learning Center"
            description="Structured courses and lessons designed by industry experts"
            href="/learning-center"
          />
          <PremiumCard
            icon={<Zap size={28} />}
            title="Practice Exams"
            description="Full-length practice tests with detailed explanations"
            href="/practice-exams"
          />
          <PremiumCard
            icon={<Microscope size={28} />}
            title="Simulator"
            description="Real-world backflow system scenarios and installations"
            href="/simulator"
          />
          <PremiumCard
            icon={<Users size={28} />}
            title="Team Training"
            description="Classroom and organizational training solutions"
            href="/organizations"
          />
        </div>
      </Section>

      {/* How It Works Section */}
      <Section
        subtitle="Your Path to Success"
        title="How It Works"
        description="A structured approach to backflow certification"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0">
          {[
            {
              step: "01",
              title: "Learn",
              description: "Master concepts through interactive lessons and expert guidance"
            },
            {
              step: "02",
              title: "Practice",
              description: "Test your knowledge with comprehensive practice exams"
            },
            {
              step: "03",
              title: "Simulate",
              description: "Apply skills to real-world scenarios in our simulator"
            },
            {
              step: "04",
              title: "Certify",
              description: "Achieve your certification with confidence"
            },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-400/30 flex items-center justify-center mb-4 font-bold text-xl text-blue-300">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
              {idx < 3 && (
                <div className="hidden md:block absolute top-8 -right-12 w-24 h-0.5 bg-gradient-to-r from-blue-600/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Built For Section */}
      <Section
        subtitle="Designed For"
        title="Built for Your Role"
        description="Whether you're a student, instructor, or organization, we have solutions for you"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="premium-card text-center">
            <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-400/30 flex items-center justify-center mx-auto mb-4">
              <BookOpen size={24} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Students</h3>
            <p className="text-sm text-gray-400 mb-4">
              Self-paced learning with practice exams, simulator training, and personalized study plans.
            </p>
            <Link href="/learning-center" className="text-blue-400 text-sm font-medium hover:text-blue-300">
              Learn more →
            </Link>
          </div>

          <div className="premium-card text-center">
            <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-400/30 flex items-center justify-center mx-auto mb-4">
              <Users size={24} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instructors</h3>
            <p className="text-sm text-gray-400 mb-4">
              Classroom management tools, progress tracking, and content customization for your students.
            </p>
            <Link href="/courses" className="text-blue-400 text-sm font-medium hover:text-blue-300">
              Learn more →
            </Link>
          </div>

          <div className="premium-card text-center">
            <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-400/30 flex items-center justify-center mx-auto mb-4">
              <Zap size={24} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Organizations</h3>
            <p className="text-sm text-gray-400 mb-4">
              Enterprise training solutions with team management, compliance tracking, and analytics.
            </p>
            <Link href="/organizations" className="text-blue-400 text-sm font-medium hover:text-blue-300">
              Learn more →
            </Link>
          </div>
        </div>
      </Section>

      {/* Find Your Path Section */}
      <Section centered={true}>
        <div className="max-w-2xl mx-auto premium-card text-center">
          <h2 className="heading-2 mb-4">Not sure where to start?</h2>
          <p className="subtext mb-8">
            Answer a few quick questions to get a personalized learning path tailored to your needs and goals.
          </p>
          <Link
            href="/quiz"
            className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Take the Quiz
          </Link>
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section centered={true} className="mb-0">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="heading-2 mb-4">Ready to get certified?</h2>
            <p className="subtext mb-8">
              Join thousands of professionals preparing for their backflow certification. Start your 7-day free trial today with no credit card required.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://sso.backflowexamprep.com/sign-up"
              className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Free Trial
            </a>
            <a
              href="https://shop.backflowexamprep.com/pricing"
              className="px-8 py-3 rounded-lg border border-white/20 text-white font-semibold hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              View Pricing
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
