import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/auth/verify-session';

export async function GET(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // Get all courses created by this instructor
    const coursesResult = await db.query(
      `SELECT c.id, c.title,
              COUNT(DISTINCT e.user_id)::int as enrollment_count,
              COALESCE(AVG(CASE WHEN e.completed_at IS NOT NULL THEN 100 ELSE 0 END), 0)::int as completion_rate,
              COALESCE(AVG(s.score), 0)::int as average_score
       FROM lms.course c
       LEFT JOIN lms.enrollment e ON c.id = e.course_id
       LEFT JOIN lms.simulator_session s ON c.id = s.course_id AND s.user_id = e.user_id
       WHERE c.created_by = $1
       GROUP BY c.id, c.title
       ORDER BY c.created_at DESC`,
      [session.userId]
    );

    // Get overall stats
    const statsResult = await db.query(
      `SELECT COUNT(DISTINCT e.user_id)::int as total_students,
              COUNT(DISTINCT c.id)::int as total_courses,
              COALESCE(AVG(CASE WHEN e.completed_at IS NOT NULL THEN 100 ELSE 0 END), 0)::int as average_completion
       FROM lms.course c
       LEFT JOIN lms.enrollment e ON c.id = e.course_id
       WHERE c.created_by = $1`,
      [session.userId]
    );

    return NextResponse.json({
      courses: coursesResult.rows,
      stats: statsResult.rows[0] || {
        total_students: 0,
        total_courses: 0,
        average_completion: 0
      }
    });
  } catch (error) {
    console.error('GET stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
