import Link from "next/link";
import { Section } from "@/components/Section";
import { Users, TrendingUp, BarChart3, BookOpen } from "lucide-react";

export const metadata = {
  title: "Courses for Instructors - Backflow Exam Prep",
  description: "Comprehensive training solutions for educators and learning centers.",
};

export default function CoursesPage() {
  return (
    <>
      {/* Hero */}
      <Section className="text-center py-32">
        <h1 className="heading-1 mb-6">
          Educator Solutions for Backflow Certification Training
        </h1>
        <p className="subtext max-w-2xl mx-auto mb-8">
          Comprehensive tools to teach, manage, and track your students' backflow certification journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://sso.backflowexamprep.com/sign-up"
            className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Set Up Class
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
        subtitle="Educator Tools"
        title="Everything to Manage Your Classroom"
        centered={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="premium-card">
            <Users size={28} className="text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Student Management</h3>
            <p className="text-sm text-gray-400">Invite, organize, and manage your students easily</p>
          </div>
          <div className="premium-card">
            <BarChart3 size={28} className="text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
            <p className="text-sm text-gray-400">Monitor student progress in real-time</p>
          </div>
          <div className="premium-card">
            <BookOpen size={28} className="text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Course Customization</h3>
            <p className="text-sm text-gray-400">Tailor content to your curriculum</p>
          </div>
          <div className="premium-card">
            <TrendingUp size={28} className="text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Analytics & Reports</h3>
            <p className="text-sm text-gray-400">Get insights into class performance</p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section centered={true} className="mb-0">
        <div className="max-w-2xl mx-auto premium-card text-center">
          <h2 className="heading-2 mb-4">Ready to teach?</h2>
          <p className="subtext mb-8">
            Start using our educator tools to manage your backflow certification classroom.
          </p>
          <a
            href="https://sso.backflowexamprep.com/sign-up"
            className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            Create Class
          </a>
        </div>
      </Section>
    </>
  );
}
