'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BarChart3, Plus, ArrowLeft } from 'lucide-react';

interface Session {
  id: string;
  started_at: string;
  ended_at: string;
  score: number;
  total_questions: number;
  duration_seconds: number;
}

export default function SimulatorPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  async function fetchSessions() {
    try {
      const res = await fetch('/api/lms/simulator/sessions');
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleStartSession() {
    try {
      const res = await fetch('/api/lms/simulator/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      if (res.ok) {
        const session = await res.json();
        // Redirect to practice exam
        window.location.href = `/lms/simulator/${session.id}`;
      }
    } catch (error) {
      console.error('Error starting session:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
        <p className="text-gray-400">Loading simulator...</p>
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

        <div className="premium-card p-8 mb-8 text-center">
          <BarChart3 size={48} className="mx-auto text-blue-400 mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Backflow Certification Simulator</h1>
          <p className="text-gray-400 mb-8">Practice with realistic exam questions and track your progress</p>
          <button
            onClick={handleStartSession}
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            <Plus size={20} />
            Start Practice Exam
          </button>
        </div>

        {sessions.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Recent Sessions</h2>
            <div className="space-y-4">
              {sessions.slice(0, 10).map((session) => (
                <div key={session.id} className="premium-card p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {session.score}/{session.total_questions} Correct
                      </p>
                      <p className="text-sm text-blue-400 font-semibold">
                        {Math.round((session.score / session.total_questions) * 100)}% Score
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">
                        {Math.floor(session.duration_seconds / 60)} minutes
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(session.started_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${(session.score / session.total_questions) * 100}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
