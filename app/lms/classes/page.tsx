'use client';

import { useEffect, useState, FormEvent } from 'react';
import Link from 'next/link';
import { Users, Plus, Copy } from 'lucide-react';

interface Class {
  id: string;
  name: string;
  enrollment_code: string;
  enrolled_count: number;
  max_students: number;
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', max_students: '' });
  const [enrollCode, setEnrollCode] = useState('');

  useEffect(() => {
    setLoading(false);
  }, []);

  async function handleEnroll(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!enrollCode.trim()) return;

    try {
      const res = await fetch(`/api/lms/classes/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollment_code: enrollCode })
      });

      if (res.ok) {
        alert('Successfully enrolled in class!');
        setEnrollCode('');
      } else {
        alert('Failed to enroll in class');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
        <p className="text-gray-400">Loading classes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Classes</h1>
            <p className="text-gray-400">Join or manage student groups</p>
          </div>
          <Link href="/lms" className="text-blue-400 hover:text-blue-300 transition">
            Back to LMS
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="premium-card p-8">
              <h2 className="text-2xl font-bold text-white mb-6">My Classes</h2>
              {classes.length === 0 ? (
                <div className="text-center py-8">
                  <Users size={48} className="mx-auto text-gray-500 mb-4" />
                  <p className="text-gray-400">No classes joined yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {classes.map((cls) => (
                    <div key={cls.id} className="border border-slate-700 rounded-lg p-4 hover:border-blue-500 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">{cls.name}</h3>
                          <p className="text-sm text-gray-400">
                            {cls.enrolled_count}/{cls.max_students || '∞'} students
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(cls.enrollment_code);
                            alert('Code copied!');
                          }}
                          className="text-blue-400 hover:text-blue-300 transition"
                        >
                          <Copy size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="premium-card p-8">
            <h3 className="text-xl font-bold text-white mb-4">Join a Class</h3>
            <form onSubmit={handleEnroll} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Enrollment Code</label>
                <input
                  type="text"
                  value={enrollCode}
                  onChange={(e) => setEnrollCode(e.target.value.toUpperCase())}
                  placeholder="e.g., ABC123"
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition"
              >
                Join Class
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
