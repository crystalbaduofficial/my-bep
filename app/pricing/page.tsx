import GlassCard from "@/components/GlassCard";
import Button from "@/components/Button";

export default function PricingPage() {
  return (
    <div className="w-full">
      <section className="py-24 md:py-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="heading-1 mb-6 text-white">Flexible Pricing for Every Need</h1>
        <p className="subtext max-w-2xl mx-auto text-lg mb-8">
          Whether you're an individual learner or managing enterprise training,
          we have a solution that scales with you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <GlassCard className="p-8">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-2xl font-bold text-white mb-2">Individual Learners</h3>
            <p className="text-gray-400 mb-6">
              Free access to learning materials, practice exams, and the simulator.
              Perfect for exam preparation.
            </p>
            <Button href="/onboarding" variant="primary" size="md" className="w-full justify-center">
              Start Learning Free
            </Button>
          </GlassCard>

          <GlassCard className="p-8 ring-2 ring-secondary">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-2xl font-bold text-white mb-2">Organizations</h3>
            <p className="text-gray-400 mb-6">
              Custom pricing for team training, compliance management, and analytics.
            </p>
            <Button href="/organizations" variant="primary" size="md" className="w-full justify-center">
              View Organization Plans
            </Button>
          </GlassCard>
        </div>

        <div className="glass-card p-12 text-center">
          <h2 className="heading-2 mb-4 text-white">Enterprise Solutions</h2>
          <p className="subtext mb-8">
            Custom pricing, dedicated support, white-label options, and unlimited scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/enterprise"
              variant="primary"
              size="lg"
            >
              Learn More
            </Button>
            <Button
              href="mailto:enterprise@backflowexamprep.com"
              variant="secondary"
              size="lg"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
