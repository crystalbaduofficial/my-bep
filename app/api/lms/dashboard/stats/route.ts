import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/auth/verify-session';

export async function GET(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // Check if user is an instructor (has created courses)
    const instructorCheck = await db.query(
      'SELECT COUNT(*) as count FROM lms.course WHERE created_by = $1',
      [session.userId]
    );

    const userRole = instructorCheck.rows[0].count > 0 ? 'instructor' : 'student';

    if (userRole === 'instructor') {
      // Instructor stats
      const statsResult = await db.query(
        `SELECT COUNT(DISTINCT c.id)::int as enrolled_courses,
                0 as in_progress_courses,
                0 as completed_courses,
                COALESCE(AVG(s.score), 0)::int as average_score,
                COUNT(DISTINCT a.id)::int as total_assignments,
                0 as pending_assignments,
                0 as certificates_earned
         FROM lms.course c
         LEFT JOIN lms.module m ON c.id = m.course_id
         LEFT JOIN lms.lesson l ON m.id = l.module_id
         LEFT JOIN lms.assignment a ON l.id = a.lesson_id
         LEFT JOIN lms.submission s ON a.id = s.assignment_id
         WHERE c.created_by = $1`,
        [session.userId]
      );

      return NextResponse.json({
        ...statsResult.rows[0],
        user_role: 'instructor'
      });
    } else {
      // Student stats
      const statsResult = await db.query(
        `SELECT COUNT(DISTINCT e.course_id)::int as enrolled_courses,
                COUNT(DISTINCT CASE WHEN e.completed_at IS NULL THEN e.course_id END)::int as in_progress_courses,
                COUNT(DISTINCT CASE WHEN e.completed_at IS NOT NULL THEN e.course_id END)::int as completed_courses,
                COALESCE(AVG(s.score), 0)::int as average_score,
                COUNT(DISTINCT a.id)::int as total_assignments,
                COUNT(DISTINCT CASE WHEN s.id IS NULL THEN a.id END)::int as pending_assignments,
                COUNT(DISTINCT ct.id)::int as certificates_earned
         FROM lms.enrollment e
         LEFT JOIN lms.course c ON e.course_id = c.id
         LEFT JOIN lms.module m ON c.id = m.course_id
         LEFT JOIN lms.lesson l ON m.id = l.module_id
         LEFT JOIN lms.assignment a ON l.id = a.lesson_id
         LEFT JOIN lms.submission s ON a.id = s.assignment_id AND s.user_id = e.user_id
         LEFT JOIN lms.certificate ct ON c.id = ct.course_id AND ct.user_id = $1
         WHERE e.user_id = $1`,
        [session.userId]
      );

      return NextResponse.json({
        ...statsResult.rows[0],
        user_role: 'student'
      });
    }
  } catch (error) {
    console.error('GET dashboard stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
