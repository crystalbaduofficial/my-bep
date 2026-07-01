import GlassCard from "@/components/GlassCard";
import Button from "@/components/Button";

export default function LearningPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="heading-1 mb-4 text-white">Learning Center</h1>
          <p className="subtext max-w-2xl mx-auto">
            Structured courses, interactive lessons, and comprehensive study materials
            to master backflow certification.
          </p>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-2 mb-8 text-white">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Residential Systems",
              duration: "4 hours",
              lessons: 12,
            },
            {
              title: "Commercial Systems",
              duration: "6 hours",
              lessons: 18,
            },
            {
              title: "Hydraulics Fundamentals",
              duration: "3 hours",
              lessons: 8,
            },
            {
              title: "Cross Connection Control",
              duration: "5 hours",
              lessons: 15,
            },
            {
              title: "Assembly & Installation",
              duration: "4 hours",
              lessons: 11,
            },
            {
              title: "Testing Procedures",
              duration: "3.5 hours",
              lessons: 10,
            },
          ].map((course) => (
            <GlassCard key={course.title}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {course.lessons} lessons • {course.duration}
                  </p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 text-sm">
                Learn essential concepts and techniques for backflow prevention.
              </p>
              <Button href="#" variant="primary" size="sm">
                Start Learning
              </Button>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Learning Features */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-2 mb-8 text-white">What You'll Get</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: "📹",
              title: "Interactive Videos",
              description: "High-quality video lessons with clear explanations and visuals.",
            },
            {
              icon: "📚",
              title: "Study Materials",
              description: "PDFs, guides, and reference materials for offline learning.",
            },
            {
              icon: "📝",
              title: "Notes & Highlights",
              description: "Take notes, highlight key concepts, and bookmark important sections.",
            },
            {
              icon: "📊",
              title: "Progress Tracking",
              description: "Monitor your learning progress and resume where you left off.",
            },
          ].map((feature) => (
            <GlassCard key={feature.title}>
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
