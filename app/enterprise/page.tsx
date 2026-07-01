import GlassCard from "@/components/GlassCard";
import Button from "@/components/Button";

export default function EnterprisePage() {
  const benefits = [
    {
      icon: "📊",
      title: "Unlimited Scale",
      desc: "Train entire organizations without limits. Handle thousands of concurrent users with zero slowdown.",
    },
    {
      icon: "🎨",
      title: "White Label Everything",
      desc: "Your branding, your domain, your identity. Customize the entire experience to match your organization.",
    },
    {
      icon: "👥",
      title: "Advanced Team Management",
      desc: "Create unlimited groups, assign trainers, track teams in real-time, manage permissions by role.",
    },
    {
      icon: "📈",
      title: "Deep Analytics Dashboard",
      desc: "Track completion rates, identify struggling team members, predict certification readiness, export reports.",
    },
    {
      icon: "🔐",
      title: "Enterprise Security",
      desc: "SSO integration, data encryption, audit logs, HIPAA compliance options, role-based access control.",
    },
    {
      icon: "🔌",
      title: "Full API Access",
      desc: "Integrate with your HR systems, LMS, and internal tools. Custom workflows and automations.",
    },
    {
      icon: "✅",
      title: "Compliance Automation",
      desc: "Automated renewal reminders, certificate tracking, audit-ready reports, regulatory requirement management.",
    },
    {
      icon: "🎓",
      title: "Instructor Management",
      desc: "Empower instructors with real-time monitoring, live feedback tools, performance analytics, certification authority.",
    },
  ];

  const useCases = [
    {
      org: "Water Districts",
      benefit: "Ensure 100% of crews are certified and current on regulations.",
    },
    {
      org: "Municipal Utilities",
      benefit: "Automate training compliance and reduce onboarding time by 60%.",
    },
    {
      org: "Licensed Contractors",
      benefit: "Keep your team certified while they work. Mobile-first design.",
    },
    {
      org: "Training Centers",
      benefit: "White-label platform to expand your reach nationally.",
    },
  ];

  return (
    <div className="w-full">
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="heading-1 mb-4 text-white">Enterprise Solutions</h1>
          <p className="subtext max-w-2xl mx-auto">
            Built for organizations that need complete control, compliance automation, and unlimited scale.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-2 mb-12 text-white text-center">Core Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            <GlassCard key={benefit.title}>
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-400">{benefit.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-2 mb-12 text-white text-center">Built for Your Organization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase) => (
            <GlassCard key={useCase.org} className="flex items-center gap-4">
              <div className="text-5xl">🏢</div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {useCase.org}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{useCase.benefit}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-2 mb-8 text-white text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Real-Time Monitoring",
              desc: "Watch training progress as it happens. See who's ready, who needs help.",
            },
            {
              title: "Automated Workflows",
              desc: "Send reminders, assign courses, generate certificates—all on autopilot.",
            },
            {
              title: "Flexible Integrations",
              desc: "Connect to your existing systems. API, webhooks, and custom integrations available.",
            },
            {
              title: "Audit-Ready Reports",
              desc: "Regulatory compliance at your fingertips. Export for audits anytime.",
            },
            {
              title: "Multi-Team Support",
              desc: "Manage multiple departments, locations, or customer groups seamlessly.",
            },
            {
              title: "Custom Branding",
              desc: "Your logo, colors, domain. Customers see your brand, not ours.",
            },
          ].map((feature) => (
            <GlassCard key={feature.title} className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 md:p-12 text-center">
          <h2 className="heading-2 mb-6 text-white">
            Ready to Empower Your Organization?
          </h2>
          <p className="subtext mb-8 max-w-2xl mx-auto">
            Let's talk about your specific needs. Our team will design a solution that works for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="https://sso.backflowexamprep.com/contact"
              variant="primary"
              size="lg"
            >
              Schedule Demo
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
