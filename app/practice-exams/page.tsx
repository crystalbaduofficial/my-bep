import Link from "next/link";
import { Section } from "@/components/Section";
import { PremiumCard } from "@/components/PremiumCard";
import { CheckCircle, Zap, BarChart3, BookOpen } from "lucide-react";

export const metadata = {
  title: "Practice Exams - Backflow Exam Prep",
  description: "Full-length practice tests with detailed explanations to prepare for your certification exam.",
};

export default function PracticeExamsPage() {
  return (
    <>
      {/* Hero */}
      <Section className="text-center py-32">
        <h1 className="heading-1 mb-6">
          Full-Length Practice Exams with Detailed Feedback
        </h1>
        <p className="subtext max-w-2xl mx-auto mb-8">
          Test your knowledge with comprehensive exams that simulate the real certification test. Get detailed explanations for every question.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://sso.backflowexamprep.com/sign-up"
            className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Take a Practice Exam
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
        subtitle="Why Practice Exams"
        title="Build Exam Confidence"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PremiumCard
            icon={<CheckCircle size={28} />}
            title="Full-Length Tests"
            description="Complete exams matching real certification format"
          />
          <PremiumCard
            icon={<BarChart3 size={28} />}
            title="Performance Analytics"
            description="Detailed reports on your strengths and weaknesses"
          />
          <PremiumCard
            icon={<Zap size={28} />}
            title="Instant Feedback"
            description="Immediate explanations for every answer"
          />
          <PremiumCard
            icon={<BookOpen size={28} />}
            title="Study Resources"
            description="Linked to learning materials for review"
          />
        </div>
      </Section>

      {/* Exam Types */}
      <Section
        subtitle="Multiple Formats"
        title="Various Practice Options"
        description="Choose the format that works best for your learning style"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Full Exams",
              description: "Complete 100-question exams under timed conditions",
              stats: "100 questions • 2 hours",
            },
            {
              title: "Topic Quizzes",
              description: "Focused quizzes on specific topics and concepts",
              stats: "15-30 questions • 30-60 min",
            },
            {
              title: "Mini Drills",
              description: "Quick practice on troublesome areas",
              stats: "5-10 questions • 10-15 min",
            },
          ].map((exam, idx) => (
            <div key={idx} className="premium-card">
              <h3 className="text-lg font-semibold mb-2">{exam.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{exam.description}</p>
              <p className="text-xs text-blue-400">{exam.stats}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section
        subtitle="Results-Driven"
        title="Why Our Exams Work"
        centered={true}
      >
        <div className="max-w-3xl mx-auto">
          <ul className="space-y-4">
            {[
              "Designed by certification experts and exam creators",
              "Regularly updated to match current exam standards",
              "Detailed explanations for every question",
              "Performance analytics to identify knowledge gaps",
              "Unlimited retakes to track improvement",
              "Flexible timing options for realistic practice",
            ].map((benefit, idx) => (
              <li key={idx} className="flex gap-3">
                <CheckCircle size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* CTA */}
      <Section centered={true} className="mb-0">
        <div className="max-w-2xl mx-auto premium-card text-center">
          <h2 className="heading-2 mb-4">Ready to practice?</h2>
          <p className="subtext mb-8">
            Start practicing with our comprehensive exams and build your confidence for certification success.
          </p>
          <a
            href="https://sso.backflowexamprep.com/sign-up"
            className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            Start Practicing
          </a>
        </div>
      </Section>
    </>
  );
}
