import GlobeHero from "@/components/GlobeHero";
import ProductOverview from "@/components/ProductOverview";
import GlassCard from "@/components/GlassCard";
import Button from "@/components/Button";
import PlanBuilder from "@/components/PlanBuilder";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <GlobeHero />

      {/* Product Features */}
      <ProductOverview />

      {/* Learning Center Preview */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="heading-2 mb-4 text-white">Learn at Your Pace</h2>
            <p className="subtext mb-6">
              Structured video lessons, interactive PDFs, detailed notes, and
              progress tracking—everything built to help you master backflow
              systems.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Interactive video lessons",
                "PDF resources and guides",
                "Bookmark and highlight",
                "Resume where you left off",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="text-secondary">✓</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            <Button
              href="https://learn.backflowexamprep.com"
              variant="primary"
              size="md"
            >
              Explore Learning Center
            </Button>
          </div>
          <div className="glass-card h-80 md:h-96 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="text-center">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-400">Learning Center Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="glass-card h-80 md:h-96 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 order-2 md:order-1">
            <div className="text-center">
              <div className="text-6xl mb-4">⚙️</div>
              <p className="text-gray-400">Interactive Simulator</p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="heading-2 mb-4 text-white">Hands-On Simulator</h2>
            <p className="subtext mb-6">
              Practice real backflow system procedures in a risk-free
              environment. Rotate valves, monitor pressure, and learn through
              interactive experience.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Interactive system controls",
                "Real-time pressure monitoring",
                "Practice mode & assessments",
                "Performance replay & analysis",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="text-secondary">✓</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            <Button
              href="https://sim.backflowexamprep.com"
              variant="primary"
              size="md"
            >
              Launch Simulator
            </Button>
          </div>
        </div>
      </section>

      {/* Practice Exams Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4 text-white">Practice for Certification</h2>
          <p className="subtext max-w-2xl mx-auto">
            Topic-specific exams guide your learning journey. Build confidence
            with each module.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Fundamentals", icon: "📖" },
            { title: "Advanced Topics", icon: "🎓" },
            { title: "Full Practice Tests", icon: "✓" },
          ].map((item) => (
            <GlassCard key={item.title} className="text-center">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Topic-specific questions to build mastery
              </p>
              <Button
                href="https://learn.backflowexamprep.com/practice"
                variant="ghost"
                size="sm"
              >
                Practice
              </Button>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Organizations Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="glass-card p-8 md:p-12 text-center">
          <h2 className="heading-2 mb-4 text-white">Train Your Team</h2>
          <p className="subtext mb-8 max-w-2xl mx-auto">
            Organizations worldwide use Backflow Exam Prep to train their teams.
            Workspace management, assignments, analytics, and compliance tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/organizations" variant="primary" size="md">
              Organization Features
            </Button>
            <Button href="/enterprise" variant="secondary" size="md">
              Enterprise Solutions
            </Button>
          </div>
        </div>
      </section>

      {/* Find Your Path Quiz */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4 text-white">Find Your Path</h2>
          <p className="subtext max-w-2xl mx-auto">
            Answer a few quick questions and we'll create a personalized study plan tailored to your goals and timeline.
          </p>
        </div>
        <PlanBuilder />
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="mb-8">
          <h2 className="heading-2 mb-4 text-white">
            Everything has a beginning.
          </h2>
          <p className="subtext max-w-2xl mx-auto">
            Seize yours with Backflow Exam Prep. Start your certification
            journey today.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            href="https://sso.backflowexamprep.com/sign-up"
            variant="primary"
            size="lg"
          >
            Create Account
            <span className="text-lg">→</span>
          </Button>
          <Button
            href="https://lms.backflowexamprep.com"
            variant="secondary"
            size="lg"
          >
            Start Learning
          </Button>
        </div>
      </section>
    </div>
  );
}
