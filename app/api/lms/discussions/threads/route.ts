import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/auth/verify-session';

export async function GET(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // Get threads from courses user is enrolled in or created
    const result = await db.query(
      `SELECT t.id, t.title, t.course_id, c.title as course_title,
              COUNT(m.id)::int as message_count,
              t.created_at,
              p.display_name as creator_name
       FROM lms.message_thread t
       JOIN lms.course c ON t.course_id = c.id
       LEFT JOIN lms.message m ON t.id = m.thread_id
       LEFT JOIN accounts.profile p ON t.created_by = p.user_id
       WHERE c.created_by = $1 OR EXISTS(
         SELECT 1 FROM lms.enrollment e WHERE e.course_id = c.id AND e.user_id = $1
       )
       GROUP BY t.id, c.title, p.display_name
       ORDER BY t.created_at DESC`,
      [session.userId]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('GET threads error:', error);
    return NextResponse.json({ error: 'Failed to fetch threads' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { course_id, title } = await request.json();

    if (!course_id || !title) {
      return NextResponse.json({ error: 'Course ID and title are required' }, { status: 400 });
    }

    // Verify user has access to this course
    const courseResult = await db.query(
      `SELECT id FROM lms.course c
       WHERE c.id = $1 AND (c.created_by = $2 OR EXISTS(
         SELECT 1 FROM lms.enrollment e WHERE e.course_id = c.id AND e.user_id = $2
       ))`,
      [course_id, session.userId]
    );

    if (courseResult.rows.length === 0) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const result = await db.query(
      `INSERT INTO lms.message_thread (course_id, created_by, title)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [course_id, session.userId, title]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('POST thread error:', error);
    return NextResponse.json({ error: 'Failed to create thread' }, { status: 500 });
  }
}
