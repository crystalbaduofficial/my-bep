import GlassCard from "@/components/GlassCard";
import Button from "@/components/Button";

export default function OrganizationsPage() {
  return (
    <div className="w-full">
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="heading-1 mb-4 text-white">Train Your Team</h1>
          <p className="subtext max-w-2xl mx-auto">
            Enterprise-grade training platform for schools, utilities, and organizations.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-2 mb-8 text-white">Organization Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: "👥",
              title: "Workspace Management",
              desc: "Invite team members, manage roles, and organize groups.",
            },
            {
              icon: "📊",
              title: "Advanced Analytics",
              desc: "Track progress, completion rates, and performance metrics.",
            },
            {
              icon: "📋",
              title: "Assignments",
              desc: "Create and assign learning paths to teams or individuals.",
            },
            {
              icon: "✓",
              title: "Compliance Tracking",
              desc: "Monitor training requirements and certification status.",
            },
            {
              icon: "📜",
              title: "Certificate Management",
              desc: "Issue official certificates and maintain audit trails.",
            },
            {
              icon: "🔒",
              title: "Security & SSO",
              desc: "Enterprise-grade security with single sign-on support.",
            },
          ].map((feature) => (
            <GlassCard key={feature.title}>
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-2 mb-8 text-white">Trusted by Organizations</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          {["Schools", "Water Districts", "Utilities", "Training Centers"].map(
            (org) => (
              <GlassCard key={org}>
                <p className="text-xl font-semibold text-white">{org}</p>
              </GlassCard>
            )
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="heading-2 mb-6 text-white">Ready to Scale Your Training?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            href="https://sso.backflowexamprep.com/contact"
            variant="primary"
            size="lg"
          >
            Start Free Trial
          </Button>
          <Button
            href="https://sso.backflowexamprep.com/login"
            variant="secondary"
            size="lg"
          >
            Sign In
          </Button>
        </div>
      </section>
    </div>
  );
}
