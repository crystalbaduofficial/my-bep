import React from "react";
import Link from "next/link";

export default function Footer() {
  const sections = [
    {
      title: "Product",
      links: [
        { label: "Learning Center", href: "https://lms.backflowexamprep.com" },
        { label: "Simulator", href: "https://lms.backflowexamprep.com/simulator" },
        { label: "Practice Exams", href: "https://lms.backflowexamprep.com/practice" },
        { label: "Courses", href: "https://lms.backflowexamprep.com/courses" },
        { label: "Certificates", href: "https://lms.backflowexamprep.com/certificates" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Students", href: "/organizations" },
        { label: "Instructors", href: "/enterprise" },
        { label: "Organizations", href: "/organizations" },
        { label: "Enterprise", href: "/enterprise" },
        { label: "Training Teams", href: "/organizations" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Help Center", href: "https://help.backflowexamprep.com" },
        { label: "Documentation", href: "https://docs.backflowexamprep.com" },
        { label: "System Status", href: "https://status.backflowexamprep.com" },
        { label: "Report a Problem", href: "https://report.backflowexamprep.com" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Shop",
      links: [
        { label: "Plans & Pricing", href: "https://shop.backflowexamprep.com/pricing" },
        { label: "Licenses", href: "https://shop.backflowexamprep.com" },
        { label: "Billing Support", href: "https://shop.backflowexamprep.com/support" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Terms", href: "/terms" },
        { label: "Privacy", href: "/privacy" },
        { label: "Refund Policy", href: "/refund-policy" },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/10 backdrop-blur-md" style={{ backgroundColor: "rgba(7, 19, 34, 0.5)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, idx) => (
                  <li key={`${section.title}-${idx}`}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-secondary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">BEP</span>
              </div>
              <span className="text-gray-400 text-sm">
                © 2026 Backflow Exam Prep. All rights reserved.
              </span>
            </div>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-secondary transition-colors text-sm"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-secondary transition-colors text-sm"
              >
                Terms
              </Link>
              <Link
                href="/refund-policy"
                className="text-gray-400 hover:text-secondary transition-colors text-sm"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
