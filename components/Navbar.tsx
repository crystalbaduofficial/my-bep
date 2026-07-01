"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, X } from "lucide-react";

const ECOSYSTEM_LINKS = [
  { label: "Learning (LMS)", href: "https://lms.backflowexamprep.com", description: "Your courses and learning path" },
  { label: "Workspaces", href: "https://workspace.backflowexamprep.com", description: "Team collaboration hub" },
  { label: "Store", href: "https://store.backflowexamprep.com", description: "Courses and materials" },
  { label: "Enterprise", href: "https://enterprise.backflowexamprep.com", description: "Organization settings" },
  { label: "Accounts", href: "https://accounts.backflowexamprep.com", description: "Profile and preferences" },
];

const SUPPORT_LINKS = [
  { label: "Help Center", href: "https://help.backflowexamprep.com", external: true },
  { label: "Status", href: "https://status.backflowexamprep.com", external: true },
  { label: "Documentation", href: "https://docs.backflowexamprep.com", external: true },
];

const HELP_LINKS = [
  { label: "Getting Started", href: "https://help.backflowexamprep.com/docs/getting-started", description: "New to Backflow? Learn the basics." },
  { label: "SSO & Identity", href: "https://help.backflowexamprep.com/docs/sso", description: "Sign-in, sessions, and security." },
  { label: "Security", href: "https://help.backflowexamprep.com/docs/security", description: "Best practices and trust guidance." },
  { label: "Embed / API", href: "https://help.backflowexamprep.com/docs/embed-api", description: "Integrate into your applications." },
  { label: "White Label", href: "https://help.backflowexamprep.com/docs/white-label", description: "Custom branding and themes." },
  { label: "Enterprise Admin", href: "https://help.backflowexamprep.com/docs/enterprise", description: "Team management and controls." },
  { label: "Webhooks", href: "https://help.backflowexamprep.com/docs/webhooks", description: "Real-time event notifications." },
  { label: "Custom Domains", href: "https://help.backflowexamprep.com/docs/domains", description: "Branded domain setup." },
  { label: "Support Tickets", href: "https://help.backflowexamprep.com/messages", description: "View your support conversations." },
  { label: "Troubleshooting", href: "https://help.backflowexamprep.com/troubleshooting", description: "Quick fixes for common issues." },
  { label: "Contact Support", href: "https://help.backflowexamprep.com/contact", description: "Send us a message anytime." },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(5,7,13,.76)] text-white shadow-[0_8px_40px_rgba(0,0,0,.32)] backdrop-blur-[22px]">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-3 px-4 sm:px-5">
          <Link href="https://sso.backflowexamprep.com" className="flex items-center gap-3 whitespace-nowrap">
            <div className="font-bold text-white text-lg">Backflow Exam Prep</div>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:block relative">
              <button
                onClick={() => setHelpDropdownOpen(!helpDropdownOpen)}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:border-white/20 hover:bg-white/10"
                aria-label="Help"
                aria-haspopup="menu"
                aria-expanded={helpDropdownOpen}
              >
                <HelpCircle size={18} strokeWidth={1.75} />
              </button>

              {helpDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setHelpDropdownOpen(false)}
                  />
                  <div className="absolute top-full right-0 mt-2 w-96 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(11,19,33,.96),rgba(5,8,14,.92))] shadow-[0_24px_120px_rgba(0,0,0,.5)] z-50 backdrop-blur-xl p-4 max-h-96 overflow-y-auto">
                    <div className="space-y-1">
                      {HELP_LINKS.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={() => setHelpDropdownOpen(false)}
                          className="block rounded-xl px-3 py-2.5 text-sm transition hover:bg-white/8"
                        >
                          <div className="text-white font-medium">{link.label}</div>
                          <div className="text-xs text-white/50 mt-0.5">{link.description}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <Link
              href="https://sso.backflowexamprep.com/sign-in"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              Sign In
            </Link>

            <Link
              href="https://sso.backflowexamprep.com/sign-up"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
            >
              Sign Up
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-expanded={mobileOpen}
              aria-label="Open menu"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/5 min-[1024px]:hidden"
            >
              Menu
              <ChevronDown size={16} className={`transition-transform duration-300 ${mobileOpen ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-xl min-[1024px]:hidden" role="dialog" aria-modal="true" onClick={() => setMobileOpen(false)}>
          <div
            onClick={(event) => event.stopPropagation()}
            className="ml-auto flex h-[100dvh] w-full max-w-[420px] flex-col border-l border-white/10 bg-[linear-gradient(180deg,rgba(5,8,14,.985),rgba(5,8,14,.955))] shadow-[0_30px_120px_rgba(0,0,0,.78)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-4 py-4">
              <div className="min-w-0">
                <div className="truncate text-[13px] font-semibold tracking-[0.14em] text-white">
                  Backflow Exam Prep
                </div>
                <div className="text-[10px] uppercase tracking-[0.24em] text-cyan-100/55">
                  Public Marketing
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-3">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                    Ecosystem
                  </div>
                  <div className="mt-3 space-y-1">
                    {ECOSYSTEM_LINKS.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-2xl px-3 py-3 text-sm text-white/82 transition hover:bg-white/8 hover:text-white"
                      >
                        <div>{link.label}</div>
                        <div className="mt-1 text-xs text-white/48">{link.description}</div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                    Help
                  </div>
                  <div className="mt-3 space-y-1">
                    {HELP_LINKS.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-2xl px-3 py-3 text-sm text-white/82 transition hover:bg-white/8 hover:text-white"
                      >
                        <div>{link.label}</div>
                        <div className="mt-1 text-xs text-white/48">{link.description}</div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                    Support
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SUPPORT_LINKS.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-cyan-200 transition hover:bg-white/10"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    href="https://sso.backflowexamprep.com/sign-in"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-sm text-white transition hover:bg-white/10"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="https://sso.backflowexamprep.com/sign-up"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-full bg-blue-600 px-4 py-2 text-center text-sm text-white transition hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
