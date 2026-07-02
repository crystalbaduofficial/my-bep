'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';

interface CourseProgress {
  course_id: string;
  course_title: string;
  completed_lessons: number;
  total_lessons: number;
  completion_percentage: number;
  avg_assignment_score: number;
  status: 'in_progress' | 'completed' | 'not_started';
}

export default function ProgressPage() {
  const [progress, setProgress] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  async function fetchProgress() {
    try {
      const res = await fetch('/api/lms/student/progress');
      if (res.ok) {
        const data = await res.json();
        setProgress(data);
      }
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
        <p className="text-gray-400">Loading progress...</p>
      </div>
    );
  }

  const completedCount = progress.filter((p) => p.status === 'completed').length;
  const inProgressCount = progress.filter((p) => p.status === 'in_progress').length;
  const averageCompletion =
    progress.length > 0
      ? Math.round(progress.reduce((sum, p) => sum + p.completion_percentage, 0) / progress.length)
      : 0;

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
          <h1 className="text-4xl font-bold text-white mb-2">Your Learning Progress</h1>
          <p className="text-gray-400">Track your course completion and performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="premium-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed Courses</p>
                <p className="text-3xl font-bold text-white mt-2">{completedCount}</p>
              </div>
              <CheckCircle size={32} className="text-green-400" />
            </div>
          </div>

          <div className="premium-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">In Progress</p>
                <p className="text-3xl font-bold text-white mt-2">{inProgressCount}</p>
              </div>
              <Clock size={32} className="text-blue-400" />
            </div>
          </div>

          <div className="premium-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Average Completion</p>
                <p className="text-3xl font-bold text-white mt-2">{averageCompletion}%</p>
              </div>
              <div className="text-blue-400 text-3xl font-bold">📊</div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">Course Breakdown</h2>
        {progress.length === 0 ? (
          <div className="text-center py-12 premium-card">
            <p className="text-gray-400">You haven't enrolled in any courses yet.</p>
            <Link
              href="/lms"
              className="inline-block mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {progress.map((course) => (
              <Link
                key={course.course_id}
                href={`/lms/courses/${course.course_id}`}
                className="premium-card p-6 hover:shadow-lg hover:shadow-blue-500/20 transition cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{course.course_title}</h3>
                    <p className="text-sm text-gray-400">
                      {course.completed_lessons}/{course.total_lessons} lessons completed
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-bold text-blue-400">{course.completion_percentage}%</p>
                    <p className="text-xs text-gray-500">
                      {course.status === 'completed'
                        ? '✓ Completed'
                        : course.status === 'in_progress'
                          ? 'In Progress'
                          : 'Not Started'}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${course.completion_percentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400">
                  Average Assignment Score: {course.avg_assignment_score.toFixed(1)}%
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
