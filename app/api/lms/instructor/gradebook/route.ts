import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/auth/verify-session';

export async function GET(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const result = await db.query(
      `SELECT c.id as course_id, c.title as course_title,
              p.display_name as student_name,
              u.email as student_email,
              a.title as assignment_title,
              s.score,
              a.points,
              s.submitted_at,
              s.graded_at
       FROM lms.course c
       JOIN lms.enrollment e ON c.id = e.course_id
       JOIN auth.user u ON e.user_id = u.id
       JOIN accounts.profile p ON u.id = p.user_id
       LEFT JOIN lms.module m ON c.id = m.course_id
       LEFT JOIN lms.lesson l ON m.id = l.module_id
       LEFT JOIN lms.assignment a ON l.id = a.lesson_id
       LEFT JOIN lms.submission s ON a.id = s.assignment_id AND s.user_id = e.user_id
       WHERE c.created_by = $1
       ORDER BY c.id, p.display_name, a.created_at`,
      [session.userId]
    );

    // Group results by course
    const grouped: {
      [key: string]: {
        course_id: string;
        course_title: string;
        grades: unknown[];
      };
    } = {};

    result.rows.forEach((row) => {
      const courseId = row.course_id;
      if (!grouped[courseId]) {
        grouped[courseId] = {
          course_id: courseId,
          course_title: row.course_title,
          grades: []
        };
      }

      if (row.assignment_title) {
        grouped[courseId].grades.push({
          student_name: row.student_name,
          student_email: row.student_email,
          assignment_title: row.assignment_title,
          score: row.score,
          points: row.points,
          submitted_at: row.submitted_at,
          graded_at: row.graded_at
        });
      }
    });

    return NextResponse.json(Object.values(grouped));
  } catch (error) {
    console.error('GET gradebook error:', error);
    return NextResponse.json({ error: 'Failed to fetch gradebook' }, { status: 500 });
  }
}
