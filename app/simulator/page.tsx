import GlassCard from "@/components/GlassCard";
import Button from "@/components/Button";

export default function SimulatorPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="heading-1 mb-4 text-white">Interactive Simulator</h1>
          <p className="subtext max-w-2xl mx-auto">
            Hands-on training with realistic backflow prevention systems.
            Practice procedures and learn through interactive experience.
          </p>
        </div>
      </section>

      {/* Simulator Preview */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard className="h-96 md:h-[500px] flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 mb-12">
          <div className="text-center">
            <div className="text-8xl mb-4">⚙️</div>
            <p className="text-gray-400 text-lg">Interactive Simulator Demo</p>
            <p className="text-gray-500 text-sm mt-2">Coming soon</p>
          </div>
        </GlassCard>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-2 mb-8 text-white">Simulator Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: "🎮",
              title: "Practice Mode",
              description: "Learn at your own pace with step-by-step guidance and instant feedback.",
            },
            {
              icon: "📊",
              title: "Assessment Mode",
              description: "Test your skills with realistic scenarios and performance tracking.",
            },
            {
              icon: "👥",
              title: "Instructor Sessions",
              description: "Train alongside instructors with real-time monitoring and feedback.",
            },
            {
              icon: "📈",
              title: "Performance Reports",
              description: "Detailed analytics on your procedure execution and improvement areas.",
            },
            {
              icon: "🔄",
              title: "Procedure Replay",
              description: "Review your actions step-by-step to identify and correct mistakes.",
            },
            {
              icon: "⚠️",
              title: "Fault Detection",
              description: "Learn from errors with detailed explanations of what went wrong.",
            },
          ].map((feature) => (
            <GlassCard key={feature.title}>
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* System Modules */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-2 mb-8 text-white">System Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Residential Systems", desc: "Single and double check valves" },
            {
              name: "Commercial Systems",
              desc: "Reduced pressure principle devices",
            },
            { name: "Industrial Systems", desc: "Complex multi-valve assemblies" },
          ].map((module) => (
            <GlassCard key={module.name} className="text-center">
              <div className="text-6xl mb-4">🔧</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {module.name}
              </h3>
              <p className="text-gray-400 text-sm mb-6">{module.desc}</p>
              <Button href="#" variant="primary" size="sm">
                Launch
              </Button>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="heading-2 mb-6 text-white">Ready to Practice?</h2>
        <Button href="/create-account" variant="primary" size="lg">
          Start Simulator
        </Button>
      </section>
    </div>
  );
}
