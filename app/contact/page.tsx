import GlassCard from "@/components/GlassCard";
import Button from "@/components/Button";

export default function ContactPage() {
  return (
    <div className="w-full">
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="heading-1 mb-4 text-white">Get in Touch</h1>
          <p className="subtext max-w-2xl mx-auto">
            Have questions? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="heading-2 mb-8 text-white">Send us a Message</h2>
            <GlassCard className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-secondary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-secondary"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-secondary resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>
              <Button href="#" variant="primary" size="md" className="w-full justify-center">
                Send Message
              </Button>
            </GlassCard>
          </div>

          {/* Contact Options */}
          <div>
            <h2 className="heading-2 mb-8 text-white">Other Ways to Reach Us</h2>
            <div className="space-y-6">
              {[
                {
                  icon: "📧",
                  title: "Support",
                  desc: "support@backflowexamprep.com",
                  label: "For technical help",
                },
                {
                  icon: "💼",
                  title: "Sales",
                  desc: "sales@backflowexamprep.com",
                  label: "For pricing & teams",
                },
                {
                  icon: "🏢",
                  title: "Enterprise",
                  desc: "enterprise@backflowexamprep.com",
                  label: "For custom solutions",
                },
                {
                  icon: "🐛",
                  title: "Report Issue",
                  desc: "issues@backflowexamprep.com",
                  label: "Report bugs or issues",
                },
              ].map((contact) => (
                <GlassCard key={contact.title}>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{contact.icon}</div>
                    <div>
                      <h3 className="font-semibold text-white">{contact.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{contact.label}</p>
                      <p className="text-secondary text-sm mt-2">{contact.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-2 mb-8 text-white text-center">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {[
            {
              q: "How long does it take to get a response?",
              a: "We typically respond within 24 hours during business hours.",
            },
            {
              q: "Do you have a phone support line?",
              a: "Email is our primary support channel. Enterprise customers have dedicated contact methods.",
            },
            {
              q: "Can I schedule a demo?",
              a: "Yes! Contact our sales team at sales@backflowexamprep.com to schedule a demo.",
            },
          ].map((faq) => (
            <GlassCard key={faq.q}>
              <p className="text-white font-semibold mb-2">{faq.q}</p>
              <p className="text-gray-400 text-sm">{faq.a}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
