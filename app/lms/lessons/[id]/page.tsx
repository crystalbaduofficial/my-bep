'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Plus } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  description: string;
  due_date: string;
  points: number;
  submission_count: number;
}

interface Lesson {
  id: string;
  title: string;
  content: string;
}

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    points: 100
  });

  useEffect(() => {
    setLesson({ id: lessonId, title: 'Lesson', content: '' });
    fetchAssignments();
  }, [lessonId]);

  async function fetchAssignments() {
    try {
      const res = await fetch(`/api/lms/lessons/assignments?lesson_id=${lessonId}`);
      if (res.ok) {
        setAssignments(await res.json());
      }
    } catch (error) {
      console.error('Failed to fetch assignments:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddAssignment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      const res = await fetch('/api/lms/lessons/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lesson_id: lessonId, ...formData })
      });

      if (res.ok) {
        const assignment = await res.json();
        setAssignments([...assignments, assignment]);
        setFormData({ title: '', description: '', due_date: '', points: 100 });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
        <p className="text-gray-400">Loading lesson...</p>
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
          <h1 className="text-3xl font-bold text-white mb-4">{lesson?.title}</h1>
          {lesson?.content && <p className="text-gray-300">{lesson.content}</p>}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Assignments</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            <Plus size={18} />
            Add Assignment
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAddAssignment} className="mb-6 premium-card p-4">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Assignment title..."
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none mb-3"
            />
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description..."
              rows={2}
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none resize-none mb-3"
            />
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="datetime-local"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                className="px-3 py-2 bg-slate-900/50 border border-slate-700 rounded text-white focus:border-blue-500 focus:outline-none"
              />
              <input
                type="number"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                min="1"
                className="px-3 py-2 bg-slate-900/50 border border-slate-700 rounded text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
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

        {assignments.length === 0 ? (
          <div className="text-center py-12 premium-card">
            <p className="text-gray-400">No assignments yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="premium-card p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white">{assignment.title}</h3>
                  <span className="text-sm px-2 py-1 rounded bg-blue-900/50 text-blue-300">
                    {assignment.points} pts
                  </span>
                </div>
                {assignment.description && (
                  <p className="text-sm text-gray-400 mb-2">{assignment.description}</p>
                )}
                {assignment.due_date && (
                  <p className="text-xs text-gray-500">
                    Due: {new Date(assignment.due_date).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
