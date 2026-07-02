import Link from 'next/link';
import { BookOpen, Users, Award, MessageSquare, BarChart3, Zap } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/lms', icon: BookOpen },
  { label: 'Courses', href: '/lms', icon: BookOpen },
  { label: 'Classes', href: '/lms/classes', icon: Users },
  { label: 'Progress', href: '/lms/progress', icon: BarChart3 },
  { label: 'Simulator', href: '/lms/simulator', icon: Zap },
  { label: 'Certificates', href: '/lms/certificates', icon: Award },
  { label: 'Discussions', href: '/lms/discussions', icon: MessageSquare }
];

export default function LMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      {/* Navigation */}
      <nav className="bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/lms" className="flex items-center gap-2">
              <BookOpen size={24} className="text-blue-400" />
              <span className="text-xl font-bold text-white">BEP LMS</span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-gray-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition flex items-center gap-2"
                >
                  <item.icon size={18} />
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </div>
            <Link href="/" className="text-gray-400 hover:text-white transition text-sm">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2026 Backflow Exam Prep. Learning Management System.</p>
        </div>
      </footer>
    </div>
  );
}
