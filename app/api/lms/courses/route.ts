import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/auth/verify-session';

export async function GET(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const workspaceId = searchParams.get('workspace_id');

  try {
    const query = workspaceId
      ? `SELECT * FROM lms.course WHERE workspace_id = $1 ORDER BY created_at DESC`
      : `SELECT c.* FROM lms.course c
         LEFT JOIN lms.enrollment e ON c.id = e.course_id
         WHERE c.created_by = $1 OR e.user_id = $1
         GROUP BY c.id
         ORDER BY c.created_at DESC`;

    const params = workspaceId ? [workspaceId] : [session.userId];
    const result = await db.query(query, params);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('GET courses error:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { title, description, workspace_id } = await request.json();

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const result = await db.query(
      `INSERT INTO lms.course (created_by, workspace_id, title, slug, description, status)
       VALUES ($1, $2, $3, $4, $5, 'draft')
       RETURNING *`,
      [session.userId, workspace_id || null, title, slug, description || null]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('POST course error:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
