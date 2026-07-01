import Link from "next/link";
import { Section } from "@/components/Section";
import { PremiumCard } from "@/components/PremiumCard";
import { BookOpen, Users, Zap, Target } from "lucide-react";

export const metadata = {
  title: "Learning Center - Backflow Exam Prep",
  description: "Structured courses and lessons designed by industry experts to help you master backflow systems.",
};

export default function LearningCenterPage() {
  return (
    <>
      {/* Hero */}
      <Section className="text-center py-32">
        <h1 className="heading-1 mb-6">
          Master Backflow Systems with Expert-Designed Courses
        </h1>
        <p className="subtext max-w-2xl mx-auto mb-8">
          Our comprehensive learning center features structured courses, interactive lessons, and expert guidance to build your expertise from the ground up.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://sso.backflowexamprep.com/sign-up"
            className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Start Learning
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
        subtitle="What's Included"
        title="Everything You Need to Learn"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PremiumCard
            icon={<BookOpen size={28} />}
            title="Video Lessons"
            description="Expert-taught video lessons covering all key concepts"
          />
          <PremiumCard
            icon={<Target size={28} />}
            title="Interactive Modules"
            description="Hands-on learning with quizzes and knowledge checks"
          />
          <PremiumCard
            icon={<Users size={28} />}
            title="Study Groups"
            description="Connect with peers and learn together"
          />
          <PremiumCard
            icon={<Zap size={28} />}
            title="Progress Tracking"
            description="Monitor your learning progress in real-time"
          />
        </div>
      </Section>

      {/* Course Structure */}
      <Section
        subtitle="Structured Learning"
        title="Our Curriculum"
        description="Courses organized from foundational concepts to advanced applications"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: "1",
              title: "Fundamentals",
              description: "Core concepts of backflow prevention and system design",
            },
            {
              num: "2",
              title: "Installation",
              description: "Proper installation, testing, and maintenance procedures",
            },
            {
              num: "3",
              title: "Advanced Topics",
              description: "Complex scenarios and professional best practices",
            },
          ].map((course) => (
            <div key={course.num} className="premium-card">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-400/30 flex items-center justify-center mb-4 font-bold text-xl text-blue-300">
                {course.num}
              </div>
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="text-sm text-gray-400">{course.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section centered={true} className="mb-0">
        <div className="max-w-2xl mx-auto premium-card text-center">
          <h2 className="heading-2 mb-4">Ready to start learning?</h2>
          <p className="subtext mb-8">
            Begin your journey to certification with our comprehensive learning center. Free 7-day trial available.
          </p>
          <a
            href="https://sso.backflowexamprep.com/sign-up"
            className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            Start Free Trial
          </a>
        </div>
      </Section>
    </>
  );
}
