import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/auth/verify-session';

export async function GET(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('course_id');

  try {
    let query = 'SELECT * FROM lms.simulator_session WHERE user_id = $1';
    const params: unknown[] = [session.userId];

    if (courseId) {
      query += ' AND course_id = $2';
      params.push(courseId);
    }

    query += ' ORDER BY started_at DESC LIMIT 50';

    const result = await db.query(query, params);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('GET sessions error:', error);
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { course_id } = await request.json();

    const result = await db.query(
      `INSERT INTO lms.simulator_session (user_id, course_id)
       VALUES ($1, $2)
       RETURNING *`,
      [session.userId, course_id || null]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('POST session error:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
