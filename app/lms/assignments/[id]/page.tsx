'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Send } from 'lucide-react';

interface Submission {
  id: string;
  content: string;
  score: number;
  feedback: string;
  submitted_at: string;
  graded_at: string;
}

export default function AssignmentPage() {
  const params = useParams();
  const router = useRouter();
  const assignmentId = params.id as string;

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSubmission();
  }, [assignmentId]);

  async function fetchSubmission() {
    try {
      const res = await fetch(`/api/lms/assignments/submissions?assignment_id=${assignmentId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.length > 0) {
          setSubmission(data[0]);
          setContent(data[0].content);
        }
      }
    } catch (error) {
      console.error('Failed to fetch submission:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/lms/assignments/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignment_id: assignmentId, content })
      });

      if (res.ok) {
        const newSubmission = await res.json();
        setSubmission(newSubmission);
        alert('Assignment submitted successfully!');
      } else {
        alert('Failed to submit assignment');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
        <p className="text-gray-400">Loading assignment...</p>
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
          <h1 className="text-3xl font-bold text-white mb-4">Assignment Submission</h1>
          <p className="text-gray-400">Submit your work for this assignment</p>
        </div>

        {submission && submission.graded_at && (
          <div className="premium-card p-8 mb-8 border-l-4 border-green-500">
            <h2 className="text-xl font-bold text-green-400 mb-4">Graded</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Score</p>
                <p className="text-2xl font-bold text-white">{submission.score}/100</p>
              </div>
              {submission.feedback && (
                <div>
                  <p className="text-sm text-gray-400">Feedback</p>
                  <p className="text-white mt-2">{submission.feedback}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="premium-card p-8">
          <h2 className="text-xl font-bold text-white mb-4">Your Submission</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your assignment response..."
            rows={10}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none resize-none mb-4"
          />
          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition"
          >
            <Send size={18} />
            {submitting ? 'Submitting...' : 'Submit Assignment'}
          </button>
        </form>
      </div>
    </div>
  );
}
