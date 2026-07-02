import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/auth/verify-session';

export async function POST(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { assignment_id, content } = await request.json();

    if (!assignment_id || !content) {
      return NextResponse.json({ error: 'Assignment ID and content are required' }, { status: 400 });
    }

    const existingResult = await db.query(
      'SELECT id FROM lms.submission WHERE assignment_id = $1 AND user_id = $2',
      [assignment_id, session.userId]
    );

    let result;
    if (existingResult.rows.length > 0) {
      result = await db.query(
        `UPDATE lms.submission SET content = $1, submitted_at = NOW()
         WHERE assignment_id = $2 AND user_id = $3 RETURNING *`,
        [content, assignment_id, session.userId]
      );
    } else {
      result = await db.query(
        `INSERT INTO lms.submission (assignment_id, user_id, content) VALUES ($1, $2, $3) RETURNING *`,
        [assignment_id, session.userId, content]
      );
    }

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('POST submission error:', error);
    return NextResponse.json({ error: 'Failed to submit assignment' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const assignmentId = searchParams.get('assignment_id');

  if (!assignmentId) {
    return NextResponse.json({ error: 'Assignment ID is required' }, { status: 400 });
  }

  try {
    const result = await db.query(
      `SELECT s.*, p.display_name FROM lms.submission s
       LEFT JOIN accounts.profile p ON s.user_id = p.user_id
       WHERE s.assignment_id = $1 AND s.user_id = $2`,
      [assignmentId, session.userId]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('GET submission error:', error);
    return NextResponse.json({ error: 'Failed to fetch submission' }, { status: 500 });
  }
}
