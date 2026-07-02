'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';

interface GradeEntry {
  student_id: string;
  student_name: string;
  student_email: string;
  assignment_title: string;
  score: number;
  points: number;
  submitted_at: string;
  graded_at: string;
}

interface CourseGrades {
  course_id: string;
  course_title: string;
  grades: GradeEntry[];
}

export default function GradebookPage() {
  const [grades, setGrades] = useState<CourseGrades[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<string>('');

  useEffect(() => {
    fetchGradebook();
  }, []);

  async function fetchGradebook() {
    try {
      const res = await fetch('/api/lms/instructor/gradebook');
      if (res.ok) {
        const data = await res.json();
        setGrades(data);
        if (data.length > 0) {
          setSelectedCourse(data[0].course_id);
        }
      }
    } catch (error) {
      console.error('Failed to fetch grades:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleExportCSV() {
    const course = grades.find((g) => g.course_id === selectedCourse);
    if (!course) return;

    const csv = [
      ['Student', 'Email', 'Assignment', 'Score', 'Points', 'Submitted', 'Graded'],
      ...course.grades.map((g) => [
        g.student_name,
        g.student_email,
        g.assignment_title,
        g.score || '-',
        g.points,
        new Date(g.submitted_at).toLocaleDateString(),
        g.graded_at ? new Date(g.graded_at).toLocaleDateString() : '-'
      ])
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gradebook-${course.course_id}.csv`;
    a.click();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
        <p className="text-gray-400">Loading gradebook...</p>
      </div>
    );
  }

  const currentCourse = grades.find((g) => g.course_id === selectedCourse);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/lms/instructor/dashboard"
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Gradebook</h1>
            <p className="text-gray-400">View and manage student grades</p>
          </div>
        </div>

        {grades.length === 0 ? (
          <div className="text-center py-12 premium-card">
            <p className="text-gray-400">No grades to display yet.</p>
          </div>
        ) : (
          <>
            <div className="mb-8 flex gap-4">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                {grades.map((g) => (
                  <option key={g.course_id} value={g.course_id}>
                    {g.course_title}
                  </option>
                ))}
              </select>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
              >
                <Download size={18} />
                Export CSV
              </button>
            </div>

            {currentCourse && currentCourse.grades.length > 0 ? (
              <div className="overflow-x-auto premium-card">
                <table className="w-full">
                  <thead className="border-b border-slate-700">
                    <tr>
                      <th className="text-left px-6 py-3 text-gray-300 font-semibold">Student</th>
                      <th className="text-left px-6 py-3 text-gray-300 font-semibold">Email</th>
                      <th className="text-left px-6 py-3 text-gray-300 font-semibold">Assignment</th>
                      <th className="text-center px-6 py-3 text-gray-300 font-semibold">Score</th>
                      <th className="text-center px-6 py-3 text-gray-300 font-semibold">Points</th>
                      <th className="text-center px-6 py-3 text-gray-300 font-semibold">Submitted</th>
                      <th className="text-center px-6 py-3 text-gray-300 font-semibold">Graded</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCourse.grades.map((grade, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-slate-700 hover:bg-slate-800/50 transition"
                      >
                        <td className="px-6 py-4 text-white">{grade.student_name}</td>
                        <td className="px-6 py-4 text-gray-400">{grade.student_email}</td>
                        <td className="px-6 py-4 text-white">{grade.assignment_title}</td>
                        <td className="px-6 py-4 text-center">
                          {grade.score !== null ? (
                            <span className="text-green-400 font-semibold">{grade.score}%</span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-400">{grade.points}</td>
                        <td className="px-6 py-4 text-center text-gray-400">
                          {new Date(grade.submitted_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-400">
                          {grade.graded_at ? new Date(grade.graded_at).toLocaleDateString() : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 premium-card">
                <p className="text-gray-400">No submissions for this course yet.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
