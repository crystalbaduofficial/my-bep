import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/auth/verify-session';

export async function POST(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { lesson_id, title, description, due_date, points } = await request.json();

    if (!lesson_id || !title) {
      return NextResponse.json({ error: 'Lesson ID and title are required' }, { status: 400 });
    }

    const lessonCheck = await db.query(
      `SELECT l.id FROM lms.lesson l
       JOIN lms.module m ON l.module_id = m.id
       JOIN lms.course c ON m.course_id = c.id
       WHERE l.id = $1 AND c.created_by = $2`,
      [lesson_id, session.userId]
    );

    if (lessonCheck.rows.length === 0) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const result = await db.query(
      `INSERT INTO lms.assignment (lesson_id, title, description, due_date, points)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [lesson_id, title, description || null, due_date || null, points || 100]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('POST assignment error:', error);
    return NextResponse.json({ error: 'Failed to create assignment' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const lessonId = searchParams.get('lesson_id');

  if (!lessonId) {
    return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 });
  }

  try {
    const result = await db.query(
      `SELECT a.*, COUNT(s.id)::int as submission_count
       FROM lms.assignment a
       LEFT JOIN lms.submission s ON a.id = s.assignment_id
       WHERE a.lesson_id = $1
       GROUP BY a.id`,
      [lessonId]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('GET assignments error:', error);
    return NextResponse.json({ error: 'Failed to fetch assignments' }, { status: 500 });
  }
}
