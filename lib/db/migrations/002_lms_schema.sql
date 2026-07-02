-- LMS Schema - Learning Management System Tables
-- Created: 2026-07-01

CREATE SCHEMA IF NOT EXISTS lms;

-- Courses
CREATE TABLE IF NOT EXISTS lms.course (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL REFERENCES auth.user(id),
  workspace_id UUID REFERENCES workspaces.workspace(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  cover_url VARCHAR(2048),
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course Enrollments
CREATE TABLE IF NOT EXISTS lms.enrollment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES lms.course(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.user(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'learner',
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(course_id, user_id)
);

-- Modules (sections within courses)
CREATE TABLE IF NOT EXISTS lms.module (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES lms.course(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  position INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lessons (content units within modules)
CREATE TABLE IF NOT EXISTS lms.lesson (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES lms.module(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  position INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assignments
CREATE TABLE IF NOT EXISTS lms.assignment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lms.lesson(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  points INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Submissions
CREATE TABLE IF NOT EXISTS lms.submission (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES lms.assignment(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.user(id) ON DELETE CASCADE,
  content TEXT,
  score INTEGER,
  feedback TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  graded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(assignment_id, user_id)
);

-- Classes (student groups)
CREATE TABLE IF NOT EXISTS lms.class (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES lms.course(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES auth.user(id),
  name VARCHAR(255) NOT NULL,
  enrollment_code VARCHAR(20) UNIQUE,
  max_students INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Class Enrollments
CREATE TABLE IF NOT EXISTS lms.class_enrollment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES lms.class(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.user(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(class_id, user_id)
);

-- Message Threads
CREATE TABLE IF NOT EXISTS lms.message_thread (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES lms.course(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES auth.user(id),
  title VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages
CREATE TABLE IF NOT EXISTS lms.message (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES lms.message_thread(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.user(id),
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Message Attachments
CREATE TABLE IF NOT EXISTS lms.message_attachment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES lms.message(id) ON DELETE CASCADE,
  file_url VARCHAR(2048) NOT NULL,
  file_name VARCHAR(255),
  file_type VARCHAR(100),
  file_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificates
CREATE TABLE IF NOT EXISTS lms.certificate (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.user(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES lms.course(id) ON DELETE CASCADE,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  certificate_number VARCHAR(255) UNIQUE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Simulator Sessions
CREATE TABLE IF NOT EXISTS lms.simulator_session (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.user(id) ON DELETE CASCADE,
  course_id UUID REFERENCES lms.course(id) ON DELETE SET NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  score INTEGER,
  total_questions INTEGER,
  duration_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_lms_course_workspace_id ON lms.course(workspace_id);
CREATE INDEX idx_lms_course_created_by ON lms.course(created_by);
CREATE INDEX idx_lms_enrollment_user_id ON lms.enrollment(user_id);
CREATE INDEX idx_lms_enrollment_course_id ON lms.enrollment(course_id);
CREATE INDEX idx_lms_module_course_id ON lms.module(course_id);
CREATE INDEX idx_lms_lesson_module_id ON lms.lesson(module_id);
CREATE INDEX idx_lms_assignment_lesson_id ON lms.assignment(lesson_id);
CREATE INDEX idx_lms_submission_assignment_id ON lms.submission(assignment_id);
CREATE INDEX idx_lms_submission_user_id ON lms.submission(user_id);
CREATE INDEX idx_lms_class_course_id ON lms.class(course_id);
CREATE INDEX idx_lms_class_enrollment_code ON lms.class(enrollment_code);
CREATE INDEX idx_lms_class_enrollment_user_id ON lms.class_enrollment(user_id);
CREATE INDEX idx_lms_message_thread_course_id ON lms.message_thread(course_id);
CREATE INDEX idx_lms_message_thread_id ON lms.message(thread_id);
CREATE INDEX idx_lms_message_author_id ON lms.message(author_id);
CREATE INDEX idx_lms_certificate_user_id ON lms.certificate(user_id);
CREATE INDEX idx_lms_simulator_session_user_id ON lms.simulator_session(user_id);
