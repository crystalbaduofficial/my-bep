import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/auth/verify-session';

export async function POST(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { module_id, title, content } = await request.json();

    if (!module_id || !title) {
      return NextResponse.json({ error: 'Module ID and title are required' }, { status: 400 });
    }

    const moduleCheck = await db.query(
      `SELECT m.id FROM lms.module m JOIN lms.course c ON m.course_id = c.id
       WHERE m.id = $1 AND c.created_by = $2`,
      [module_id, session.userId]
    );

    if (moduleCheck.rows.length === 0) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const posResult = await db.query(
      'SELECT COALESCE(MAX(position), 0) + 1 as next_pos FROM lms.lesson WHERE module_id = $1',
      [module_id]
    );

    const result = await db.query(
      `INSERT INTO lms.lesson (module_id, title, content, position) VALUES ($1, $2, $3, $4) RETURNING *`,
      [module_id, title, content || null, posResult.rows[0].next_pos]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('POST lesson error:', error);
    return NextResponse.json({ error: 'Failed to create lesson' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const moduleId = searchParams.get('module_id');

  if (!moduleId) {
    return NextResponse.json({ error: 'Module ID is required' }, { status: 400 });
  }

  try {
    const result = await db.query(
      `SELECT l.*, COUNT(a.id)::int as assignment_count
       FROM lms.lesson l
       LEFT JOIN lms.assignment a ON l.id = a.lesson_id
       WHERE l.module_id = $1
       GROUP BY l.id
       ORDER BY l.position`,
      [moduleId]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('GET lessons error:', error);
    return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 });
  }
}
