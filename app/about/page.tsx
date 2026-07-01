import GlassCard from "@/components/GlassCard";
import Button from "@/components/Button";

export default function AboutPage() {
  return (
    <div className="w-full">
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="heading-1 mb-4 text-white">About Backflow Exam Prep</h1>
          <p className="subtext max-w-2xl mx-auto">
            Making professional certification accessible, interactive, and modern.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="heading-2 mb-6 text-white">Our Mission</h2>
          <p className="subtext mb-8">
            Every professional starts somewhere. Backflow certification should be accessible,
            interactive, and modern. We built Backflow Exam Prep to make learning feel
            connected instead of fragmented.
          </p>

          <h2 className="heading-2 mb-6 text-white mt-12">Why We Built This</h2>
          <p className="subtext mb-8">
            Traditional training materials felt outdated. We envisioned a platform where
            professionals could learn through interactive courses, hands-on simulation, and
            comprehensive practice—all in one cohesive ecosystem.
          </p>

          <h2 className="heading-2 mb-6 text-white mt-12">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: "Interactive Learning",
                desc: "Video lessons, PDFs, notes, highlights—whatever works best for you.",
              },
              {
                title: "Hands-On Practice",
                desc: "Real-world simulator lets you practice procedures risk-free.",
              },
              {
                title: "Comprehensive Testing",
                desc: "Topic-specific exams and full practice tests build confidence.",
              },
              {
                title: "Progress Tracking",
                desc: "Monitor your journey from beginner to certified professional.",
              },
            ].map((approach) => (
              <GlassCard key={approach.title}>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {approach.title}
                </h3>
                <p className="text-gray-400">{approach.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-2 mb-8 text-white text-center">
          Built for Professionals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              group: "Students",
              desc: "Preparing for their first certification exam",
            },
            {
              group: "Instructors",
              desc: "Teaching the next generation of professionals",
            },
            {
              group: "Organizations",
              desc: "Training teams at scale with compliance tracking",
            },
          ].map((group) => (
            <GlassCard key={group.group} className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                {group.group}
              </h3>
              <p className="text-gray-400">{group.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="heading-2 mb-6 text-white">Join Our Community</h2>
        <p className="subtext max-w-2xl mx-auto mb-8">
          Thousands of professionals have earned their certifications with Backflow Exam Prep.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/create-account" variant="primary" size="lg">
            Get Started
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}
