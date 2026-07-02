import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/auth/verify-session';

export async function POST(request: NextRequest) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { enrollment_code } = await request.json();

    if (!enrollment_code) {
      return NextResponse.json({ error: 'Enrollment code is required' }, { status: 400 });
    }

    const classResult = await db.query(
      'SELECT * FROM lms.class WHERE enrollment_code = $1',
      [enrollment_code.toUpperCase()]
    );

    if (classResult.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid enrollment code' }, { status: 404 });
    }

    const classData = classResult.rows[0];

    if (classData.max_students) {
      const enrolledResult = await db.query(
        'SELECT COUNT(*) as count FROM lms.class_enrollment WHERE class_id = $1',
        [classData.id]
      );
      if (enrolledResult.rows[0].count >= classData.max_students) {
        return NextResponse.json({ error: 'Class is full' }, { status: 400 });
      }
    }

    const existingResult = await db.query(
      'SELECT * FROM lms.class_enrollment WHERE class_id = $1 AND user_id = $2',
      [classData.id, session.userId]
    );

    if (existingResult.rows.length > 0) {
      return NextResponse.json({ error: 'Already enrolled in this class' }, { status: 400 });
    }

    const result = await db.query(
      'INSERT INTO lms.class_enrollment (class_id, user_id) VALUES ($1, $2) RETURNING *',
      [classData.id, session.userId]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('POST enroll error:', error);
    return NextResponse.json({ error: 'Failed to enroll in class' }, { status: 500 });
  }
}
