import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/auth/verify-session';

export async function GET(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const result = await db.query(
      `SELECT c.id as course_id, c.title as course_title,
              COUNT(DISTINCT l.id)::int as total_lessons,
              0 as completed_lessons,
              CASE
                WHEN e.completed_at IS NOT NULL THEN 'completed'
                WHEN COUNT(DISTINCT l.id) > 0 THEN 'in_progress'
                ELSE 'not_started'
              END as status,
              COALESCE(AVG(s.score), 0)::int as avg_assignment_score
       FROM lms.enrollment e
       JOIN lms.course c ON e.course_id = c.id
       LEFT JOIN lms.module m ON c.id = m.course_id
       LEFT JOIN lms.lesson l ON m.id = l.module_id
       LEFT JOIN lms.assignment a ON l.id = a.lesson_id
       LEFT JOIN lms.submission s ON a.id = s.assignment_id AND s.user_id = e.user_id
       WHERE e.user_id = $1
       GROUP BY c.id, c.title, e.completed_at
       ORDER BY c.created_at DESC`,
      [session.userId]
    );

    // Transform results to include completion percentage
    const courseProgress = result.rows.map((row) => ({
      ...row,
      completion_percentage: row.total_lessons > 0 ? Math.round((row.completed_lessons / row.total_lessons) * 100) : 0
    }));

    return NextResponse.json(courseProgress);
  } catch (error) {
    console.error('GET progress error:', error);
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
  }
}
