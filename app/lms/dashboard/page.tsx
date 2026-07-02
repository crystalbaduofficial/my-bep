'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Users,
  Award,
  MessageSquare,
  BarChart3,
  Zap,
  ArrowRight
} from 'lucide-react';

interface DashboardStats {
  enrolled_courses: number;
  in_progress_courses: number;
  completed_courses: number;
  average_score: number;
  total_assignments: number;
  pending_assignments: number;
  certificates_earned: number;
}

export default function LMSDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<'student' | 'instructor'>('student');

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const res = await fetch('/api/lms/dashboard/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
        setUserRole(data.user_role || 'student');
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
        <p className="text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome to Your Learning Hub</h1>
          <p className="text-gray-400">
            {userRole === 'instructor'
              ? 'Manage your courses and track student progress'
              : 'Continue your learning journey and earn certificates'}
          </p>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="premium-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Enrolled Courses</p>
                  <p className="text-3xl font-bold text-white mt-2">{stats.enrolled_courses}</p>
                </div>
                <BookOpen size={32} className="text-blue-400" />
              </div>
            </div>

            <div className="premium-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">In Progress</p>
                  <p className="text-3xl font-bold text-white mt-2">{stats.in_progress_courses}</p>
                </div>
                <Zap size={32} className="text-yellow-400" />
              </div>
            </div>

            <div className="premium-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg Score</p>
                  <p className="text-3xl font-bold text-white mt-2">{Math.round(stats.average_score)}%</p>
                </div>
                <BarChart3 size={32} className="text-green-400" />
              </div>
            </div>

            <div className="premium-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Certificates</p>
                  <p className="text-3xl font-bold text-white mt-2">{stats.certificates_earned}</p>
                </div>
                <Award size={32} className="text-purple-400" />
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/lms/courses/create"
              className="premium-card p-6 hover:shadow-lg hover:shadow-blue-500/20 transition cursor-pointer group"
            >
              <BookOpen size={32} className="text-blue-400 mb-4 group-hover:scale-110 transition" />
              <h3 className="text-lg font-semibold text-white mb-2">Create Course</h3>
              <p className="text-gray-400 text-sm mb-4">Start building a new course for your students</p>
              <div className="flex items-center gap-2 text-blue-400 group-hover:gap-3 transition">
                <span>Get Started</span>
                <ArrowRight size={18} />
              </div>
            </Link>

            <Link
              href="/lms/simulator"
              className="premium-card p-6 hover:shadow-lg hover:shadow-blue-500/20 transition cursor-pointer group"
            >
              <Zap size={32} className="text-yellow-400 mb-4 group-hover:scale-110 transition" />
              <h3 className="text-lg font-semibold text-white mb-2">Practice Exam</h3>
              <p className="text-gray-400 text-sm mb-4">Take a practice exam to test your knowledge</p>
              <div className="flex items-center gap-2 text-blue-400 group-hover:gap-3 transition">
                <span>Start Practicing</span>
                <ArrowRight size={18} />
              </div>
            </Link>

            <Link
              href="/lms/progress"
              className="premium-card p-6 hover:shadow-lg hover:shadow-blue-500/20 transition cursor-pointer group"
            >
              <BarChart3 size={32} className="text-green-400 mb-4 group-hover:scale-110 transition" />
              <h3 className="text-lg font-semibold text-white mb-2">View Progress</h3>
              <p className="text-gray-400 text-sm mb-4">Track your learning progress across courses</p>
              <div className="flex items-center gap-2 text-blue-400 group-hover:gap-3 transition">
                <span>Check Progress</span>
                <ArrowRight size={18} />
              </div>
            </Link>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Learning Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="premium-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Getting Started</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>✓ Create your first course</li>
                <li>✓ Organize content with modules and lessons</li>
                <li>✓ Add assignments and track submissions</li>
                <li>✓ Grade work and provide feedback</li>
              </ul>
            </div>

            <div className="premium-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Student Features</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>✓ Enroll in courses and track progress</li>
                <li>✓ Complete assignments and get feedback</li>
                <li>✓ Practice with the exam simulator</li>
                <li>✓ Earn and share certificates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
