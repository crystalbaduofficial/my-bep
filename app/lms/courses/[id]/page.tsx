'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  position: number;
  lesson_count: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  status: string;
}

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [moduleTitle, setModuleTitle] = useState('');

  useEffect(() => {
    fetchCourse();
    fetchModules();
  }, [courseId]);

  async function fetchCourse() {
    try {
      const res = await fetch(`/api/lms/courses/${courseId}`);
      if (res.ok) {
        setCourse(await res.json());
      }
    } catch (error) {
      console.error('Failed to fetch course:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchModules() {
    try {
      const res = await fetch(`/api/lms/courses/modules?course_id=${courseId}`);
      if (res.ok) {
        setModules(await res.json());
      }
    } catch (error) {
      console.error('Failed to fetch modules:', error);
    }
  }

  async function handleAddModule(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!moduleTitle.trim()) return;

    try {
      const res = await fetch('/api/lms/courses/modules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_id: courseId, title: moduleTitle })
      });

      if (res.ok) {
        const module = await res.json();
        setModules([...modules, module]);
        setModuleTitle('');
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
        <p className="text-gray-400">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
        <p className="text-gray-400">Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/lms"
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft size={20} />
          Back to LMS
        </Link>

        <div className="premium-card p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
              {course.description && <p className="text-gray-400">{course.description}</p>}
            </div>
            <span className="px-3 py-1 rounded bg-blue-900/50 text-blue-300 text-sm font-semibold">
              {course.status}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Modules</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            <Plus size={18} />
            Add Module
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAddModule} className="mb-6 premium-card p-4">
            <input
              type="text"
              value={moduleTitle}
              onChange={(e) => setModuleTitle(e.target.value)}
              placeholder="Module title..."
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none mb-3"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-2 border border-slate-600 text-white rounded font-semibold hover:border-slate-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {modules.length === 0 ? (
          <div className="text-center py-12 premium-card">
            <p className="text-gray-400">No modules yet. Add one to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {modules.map((module) => (
              <Link
                key={module.id}
                href={`/lms/modules/${module.id}`}
                className="premium-card p-6 hover:shadow-lg hover:shadow-blue-500/20 transition cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{module.title}</h3>
                    <p className="text-sm text-gray-400">
                      {module.lesson_count} lesson{module.lesson_count !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-slate-700 text-gray-300">
                    Module {module.position}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
