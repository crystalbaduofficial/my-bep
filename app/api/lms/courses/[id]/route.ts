import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/auth/verify-session';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const result = await db.query(
      `SELECT c.* FROM lms.course c
       WHERE c.id = $1 AND (c.created_by = $2 OR EXISTS(
         SELECT 1 FROM lms.enrollment e WHERE e.course_id = c.id AND e.user_id = $2
       ))`,
      [(await params).id, session.userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('GET course error:', error);
    return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { title, description, status, cover_url } = await request.json();

    const courseResult = await db.query(
      'SELECT created_by FROM lms.course WHERE id = $1',
      [(await params).id]
    );

    if (courseResult.rows.length === 0 || courseResult.rows[0].created_by !== session.userId) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const result = await db.query(
      `UPDATE lms.course SET title = COALESCE($1, title),
        description = COALESCE($2, description),
        status = COALESCE($3, status),
        cover_url = COALESCE($4, cover_url),
        updated_at = NOW()
       WHERE id = $5 RETURNING *`,
      [title, description, status, cover_url, (await params).id]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('PUT course error:', error);
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const courseResult = await db.query(
      'SELECT created_by FROM lms.course WHERE id = $1',
      [(await params).id]
    );

    if (courseResult.rows.length === 0 || courseResult.rows[0].created_by !== session.userId) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    await db.query('DELETE FROM lms.course WHERE id = $1', [(await params).id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE course error:', error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
