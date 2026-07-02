'use client';

import { useEffect, useState, FormEvent } from 'react';
import Link from 'next/link';
import { MessageSquare, Plus, ArrowLeft, Search } from 'lucide-react';

interface Thread {
  id: string;
  title: string;
  course_id: string;
  course_title: string;
  message_count: number;
  created_at: string;
  creator_name: string;
}

export default function DiscussionsPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchThreads();
  }, []);

  async function fetchThreads() {
    try {
      const res = await fetch('/api/lms/discussions/threads');
      if (res.ok) {
        const data = await res.json();
        setThreads(data);
      }
    } catch (error) {
      console.error('Failed to fetch threads:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredThreads = threads.filter((thread) =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
        <p className="text-gray-400">Loading discussions...</p>
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

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Course Discussions</h1>
            <p className="text-gray-400">Engage with instructors and classmates</p>
          </div>
        </div>

        <div className="mb-8 flex gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search discussions..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <Link
            href="/lms/discussions/create"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            <Plus size={18} />
            New Thread
          </Link>
        </div>

        {filteredThreads.length === 0 ? (
          <div className="text-center py-12 premium-card">
            <MessageSquare size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-gray-400">
              {searchQuery ? 'No discussions match your search.' : 'No discussions yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredThreads.map((thread) => (
              <Link
                key={thread.id}
                href={`/lms/discussions/${thread.id}`}
                className="premium-card p-6 hover:shadow-lg hover:shadow-blue-500/20 transition cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <MessageSquare size={24} className="text-blue-400 flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-1 truncate">
                      {thread.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">
                      in <span className="font-semibold">{thread.course_title}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Started by {thread.creator_name} • {thread.message_count} message
                      {thread.message_count !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-500">
                      {new Date(thread.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
