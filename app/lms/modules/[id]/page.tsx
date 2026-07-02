'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  position: number;
  assignment_count: number;
}

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.id as string;

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchLessons();
  }, [moduleId]);

  async function fetchLessons() {
    try {
      const res = await fetch(`/api/lms/modules/lessons?module_id=${moduleId}`);
      if (res.ok) {
        setLessons(await res.json());
      }
    } catch (error) {
      console.error('Failed to fetch lessons:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddLesson(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      const res = await fetch('/api/lms/modules/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ module_id: moduleId, ...formData })
      });

      if (res.ok) {
        const lesson = await res.json();
        setLessons([...lessons, lesson]);
        setFormData({ title: '', content: '' });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
        <p className="text-gray-400">Loading module...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="premium-card p-8 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Module</h1>
          <p className="text-gray-400">Manage lessons and content</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Lessons</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            <Plus size={18} />
            Add Lesson
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAddLesson} className="mb-6 premium-card p-4">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Lesson title..."
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none mb-3"
            />
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Lesson content..."
              rows={4}
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none resize-none mb-3"
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

        {lessons.length === 0 ? (
          <div className="text-center py-12 premium-card">
            <p className="text-gray-400">No lessons yet. Add one to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/lms/lessons/${lesson.id}`}
                className="premium-card p-6 hover:shadow-lg hover:shadow-blue-500/20 transition cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{lesson.title}</h3>
                    <p className="text-sm text-gray-400">
                      {lesson.assignment_count} assignment{lesson.assignment_count !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-slate-700 text-gray-300">
                    Lesson {lesson.position}
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
