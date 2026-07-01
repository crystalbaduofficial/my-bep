"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "./Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const mainLinks = [
    { label: "Training", href: "https://lms.backflowexamprep.com" },
    { label: "Practice Exams", href: "https://lms.backflowexamprep.com/practice" },
    { label: "Simulator", href: "https://lms.backflowexamprep.com/simulator" },
    { label: "Courses", href: "https://lms.backflowexamprep.com/courses" },
    { label: "Organizations", href: "/organizations" },
    { label: "Enterprise", href: "/enterprise" },
  ];

  const resourceLinks = [
    { label: "Resources", href: "#" },
    { label: "Pricing", href: "/pricing" },
    { label: "Help", href: "https://help.backflowexamprep.com" },
  ];

  const helpLinks = [
    { label: "Help Center", href: "https://help.backflowexamprep.com" },
    { label: "Documentation", href: "https://docs.backflowexamprep.com" },
    { label: "Report a Problem", href: "https://report.backflowexamprep.com" },
  ];

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BEP</span>
              </div>
              <span className="hidden sm:inline text-white font-semibold text-sm md:text-base">
                Backflow Exam Prep
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-300 hover:text-secondary hover:bg-white/5 rounded transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="w-px h-6 bg-white/10 mx-2" />
            {resourceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-300 hover:text-secondary hover:bg-white/5 rounded transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side: Icons + Auth */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Icon */}
            <button className="hidden md:flex p-2 text-gray-400 hover:text-secondary transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Status Dot */}
            <div className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs text-green-300">Operational</span>
            </div>

            {/* Help Dropdown */}
            <div className="relative group hidden md:block">
              <button className="p-2 text-gray-400 hover:text-secondary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div className="absolute right-0 mt-0 w-40 rounded-lg glass border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 shadow-lg">
                {helpLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-secondary hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth Buttons */}
            <Button
              variant="ghost"
              size="sm"
              href="https://sso.backflowexamprep.com/sign-in"
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              size="sm"
              href="https://sso.backflowexamprep.com/sign-up"
            >
              Create Account
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
            >
              <span
                className={`h-0.5 bg-white transition-all ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`h-0.5 bg-white transition-all ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 bg-white transition-all ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-white/10 mt-4 pt-4 space-y-2">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm text-gray-300 hover:text-secondary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
            {resourceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm text-gray-300 hover:text-secondary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
