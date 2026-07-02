'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Plus } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

export default function LMSPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const res = await fetch('/api/lms/courses');
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
        <p className="text-gray-400">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Learning Management System</h1>
            <p className="text-gray-400">Manage your courses and track student progress</p>
          </div>
          <Link
            href="/lms/courses/create"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            <Plus size={20} />
            New Course
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12 premium-card">
            <BookOpen size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-gray-400 mb-6">No courses yet. Create one to get started.</p>
            <Link
              href="/lms/courses/create"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Create Your First Course
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/lms/courses/${course.id}`}
                className="group premium-card p-6 hover:shadow-lg hover:shadow-blue-500/20 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <BookOpen size={24} className="text-blue-400" />
                  <span className="text-xs px-2 py-1 rounded bg-blue-900/50 text-blue-300">
                    {course.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition mb-2">
                  {course.title}
                </h3>
                {course.description && (
                  <p className="text-sm text-gray-400 line-clamp-2">{course.description}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
