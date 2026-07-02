import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/auth/verify-session';

export async function POST(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { course_id, title } = await request.json();

    if (!course_id || !title) {
      return NextResponse.json({ error: 'Course ID and title are required' }, { status: 400 });
    }

    const courseCheck = await db.query(
      'SELECT created_by FROM lms.course WHERE id = $1',
      [course_id]
    );

    if (courseCheck.rows.length === 0 || courseCheck.rows[0].created_by !== session.userId) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const posResult = await db.query(
      'SELECT COALESCE(MAX(position), 0) + 1 as next_pos FROM lms.module WHERE course_id = $1',
      [course_id]
    );

    const result = await db.query(
      `INSERT INTO lms.module (course_id, title, position) VALUES ($1, $2, $3) RETURNING *`,
      [course_id, title, posResult.rows[0].next_pos]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('POST module error:', error);
    return NextResponse.json({ error: 'Failed to create module' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('course_id');

  if (!courseId) {
    return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
  }

  try {
    const result = await db.query(
      `SELECT m.*, COUNT(l.id)::int as lesson_count
       FROM lms.module m
       LEFT JOIN lms.lesson l ON m.id = l.module_id
       WHERE m.course_id = $1
       GROUP BY m.id
       ORDER BY m.position`,
      [courseId]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('GET modules error:', error);
    return NextResponse.json({ error: 'Failed to fetch modules' }, { status: 500 });
  }
}
