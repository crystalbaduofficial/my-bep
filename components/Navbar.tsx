"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Learning Center", href: "/learning-center" },
  { label: "Practice Exams", href: "/practice-exams" },
  { label: "Simulator", href: "/simulator" },
  { label: "Courses", href: "/courses" },
  { label: "Organizations", href: "/organizations" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Pricing", href: "https://shop.backflowexamprep.com/pricing" },
  { label: "Resources", href: "/resources" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(3,7,18,.7)] text-white backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 whitespace-nowrap flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-400/30" />
            <span className="font-semibold text-white hidden sm:inline">Backflow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-300 hover:text-white transition rounded-md hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="ml-auto hidden md:flex items-center gap-2">
            <a
              href="https://help.backflowexamprep.com"
              className="px-3 py-2 text-sm text-gray-300 hover:text-white transition"
            >
              Help
            </a>
            <a
              href="https://sso.backflowexamprep.com/sign-in"
              className="px-3 py-2 text-sm text-gray-300 hover:text-white transition"
            >
              Sign In
            </a>
            <a
              href="https://sso.backflowexamprep.com/sign-up"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            className="md:hidden p-2 text-gray-300 hover:text-white transition"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[50] bg-black/80 backdrop-blur-md md:hidden" role="dialog" aria-modal="true" onClick={() => setMobileOpen(false)}>
          <div
            onClick={(event) => event.stopPropagation()}
            className="absolute top-16 left-0 right-0 border-b border-white/10 bg-dark-1/95 backdrop-blur-md p-4"
          >
            <nav className="space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/10 mt-4 pt-4 space-y-2">
                <a
                  href="https://help.backflowexamprep.com"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition"
                >
                  Help
                </a>
                <a
                  href="https://sso.backflowexamprep.com/sign-in"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition"
                >
                  Sign In
                </a>
                <a
                  href="https://sso.backflowexamprep.com/sign-up"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition text-center"
                >
                  Sign Up
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
