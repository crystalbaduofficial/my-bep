import GlassCard from "@/components/GlassCard";
import Button from "@/components/Button";

export default function PracticeExamsPage() {
  const examTopics = [
    { title: "Cross Connection Control", questions: 25, difficulty: "Beginner" },
    { title: "Assembly Types", questions: 30, difficulty: "Intermediate" },
    { title: "Hydraulics & Pressure", questions: 28, difficulty: "Intermediate" },
    { title: "Installation Methods", questions: 22, difficulty: "Beginner" },
    { title: "Testing Procedures", questions: 35, difficulty: "Advanced" },
    { title: "Certification Exam", questions: 50, difficulty: "Advanced" },
  ];

  return (
    <div className="w-full">
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="heading-1 mb-4 text-white">Practice Exams</h1>
          <p className="subtext max-w-2xl mx-auto">
            Master every topic with targeted practice questions and full certification exams.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examTopics.map((exam) => (
            <GlassCard key={exam.title}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {exam.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {exam.questions} questions
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    exam.difficulty === "Beginner"
                      ? "bg-green-500/20 text-green-300"
                      : exam.difficulty === "Intermediate"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {exam.difficulty}
                </span>
              </div>
              <Button href="#" variant="primary" size="sm">
                Practice
              </Button>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-2 mb-8 text-white">Your Learning Path</h2>
        <div className="space-y-4">
          {[
            { step: 1, title: "Master Fundamentals", status: "Start here" },
            { step: 2, title: "Practice Topic Exams", status: "After lessons" },
            { step: 3, title: "Use the Simulator", status: "Hands-on" },
            { step: 4, title: "Full Practice Tests", status: "Before cert" },
            { step: 5, title: "Get Certified", status: "Ready?" },
          ].map((path) => (
            <GlassCard key={path.step} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">{path.step}</span>
                </div>
                <div>
                  <p className="text-white font-semibold">{path.title}</p>
                  <p className="text-gray-400 text-sm">{path.status}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
