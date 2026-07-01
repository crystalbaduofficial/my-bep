import GlassCard from "@/components/GlassCard";
import Button from "@/components/Button";

export default function CoursesPage() {
  return (
    <div className="w-full">
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="heading-1 mb-4 text-white">Course Library</h1>
          <p className="subtext max-w-2xl mx-auto">
            Comprehensive courses covering all aspects of backflow prevention and certification.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Residential Systems",
            "Commercial Systems",
            "Troubleshooting",
            "Hydraulics",
            "Cross Connection",
            "Exam Review",
          ].map((course) => (
            <GlassCard key={course}>
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-lg font-semibold text-white mb-4">{course}</h3>
              <Button href="/learning" variant="primary" size="sm">
                View Course
              </Button>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
