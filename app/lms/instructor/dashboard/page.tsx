'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BarChart3, Users, BookOpen, ArrowLeft } from 'lucide-react';

interface CourseStats {
  id: string;
  title: string;
  enrollment_count: number;
  completion_rate: number;
  average_score: number;
}

export default function InstructorDashboard() {
  const [courses, setCourses] = useState<CourseStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    averageCompletion: 0
  });

  useEffect(() => {
    fetchInstructorData();
  }, []);

  async function fetchInstructorData() {
    try {
      const res = await fetch('/api/lms/instructor/stats');
      if (res.ok) {
        const data = await res.json();
        setCourses(data.courses || []);
        setStats(data.stats || {});
      }
    } catch (error) {
      console.error('Failed to fetch instructor data:', error);
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/lms"
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft size={20} />
          Back to LMS
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Instructor Dashboard</h1>
          <p className="text-gray-400">Monitor your courses and student progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="premium-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Students</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.totalStudents}</p>
              </div>
              <Users size={32} className="text-blue-400" />
            </div>
          </div>

          <div className="premium-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Courses</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.totalCourses}</p>
              </div>
              <BookOpen size={32} className="text-blue-400" />
            </div>
          </div>

          <div className="premium-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Completion</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {Math.round(stats.averageCompletion)}%
                </p>
              </div>
              <BarChart3 size={32} className="text-blue-400" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Your Courses</h2>
          {courses.length === 0 ? (
            <div className="text-center py-12 premium-card">
              <p className="text-gray-400">No courses yet. Create one to get started.</p>
              <Link
                href="/lms/courses/create"
                className="inline-block mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
              >
                Create Course
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/lms/courses/${course.id}`}
                  className="premium-card p-6 hover:shadow-lg hover:shadow-blue-500/20 transition"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">{course.title}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Students</span>
                      <span className="text-white font-semibold">{course.enrollment_count}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Completion Rate</span>
                      <span className="text-blue-400 font-semibold">
                        {Math.round(course.completion_rate)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Avg Score</span>
                      <span className="text-white font-semibold">
                        {Math.round(course.average_score)}%
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
