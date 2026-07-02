-- LMS Media Foundation - Storage and Tracking
-- Created: 2026-07-02
-- Provides media asset management for courses, classes, lessons, and assignments

-- Media Objects (core metadata for all media assets)
CREATE TABLE IF NOT EXISTS lms.media_object (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(50) NOT NULL, -- 'cover', 'lesson', 'resource', 'submission'
  media_type VARCHAR(100) NOT NULL, -- 'image/jpeg', 'video/mp4', 'application/pdf'
  original_filename VARCHAR(500) NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  duration_seconds INTEGER, -- for video/audio
  dimensions JSONB, -- {width, height} for images

  -- Storage location
  r2_key VARCHAR(2048) NOT NULL UNIQUE, -- object key in R2
  r2_etag VARCHAR(255), -- for integrity checks

  -- Ownership and permissions
  owner_id UUID NOT NULL REFERENCES auth.user(id) ON DELETE CASCADE,
  visibility VARCHAR(50) DEFAULT 'private', -- 'private', 'course', 'public_safe'

  -- Status tracking
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'uploading', 'active', 'deleted'
  error_message TEXT,

  -- Audit
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Upload Intents (track presigned URL generation)
CREATE TABLE IF NOT EXISTS lms.upload_intent (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_object_id UUID NOT NULL REFERENCES lms.media_object(id) ON DELETE CASCADE,

  -- Presigned URL details
  presigned_url VARCHAR(2048) NOT NULL,
  url_expires_at TIMESTAMP WITH TIME ZONE NOT NULL,

  -- Upload status
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'uploaded', 'verified', 'failed'
  uploaded_at TIMESTAMP WITH TIME ZONE,
  verified_at TIMESTAMP WITH TIME ZONE,

  -- Client info
  request_ip VARCHAR(45),
  user_agent TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media Audit Events (compliance trail for all media access)
CREATE TABLE IF NOT EXISTS lms.media_audit_event (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_object_id UUID NOT NULL REFERENCES lms.media_object(id) ON DELETE CASCADE,

  -- Event details
  event_type VARCHAR(100) NOT NULL, -- 'upload_intent', 'upload_complete', 'access', 'delete'
  user_id UUID REFERENCES auth.user(id) ON DELETE SET NULL,

  -- Context
  resource_type VARCHAR(100), -- 'course_cover', 'class_cover', 'lesson_media', 'assignment_resource'
  resource_id UUID,

  -- Request context
  request_ip VARCHAR(45),
  user_agent TEXT,

  -- Event metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course cover media link
ALTER TABLE IF EXISTS lms.course ADD COLUMN IF NOT EXISTS media_asset_id UUID REFERENCES lms.media_object(id) ON DELETE SET NULL;

-- Class cover media link (with override capability)
ALTER TABLE IF EXISTS lms.class ADD COLUMN IF NOT EXISTS media_asset_id UUID REFERENCES lms.media_object(id) ON DELETE SET NULL;

-- Lesson media link
ALTER TABLE IF EXISTS lms.lesson ADD COLUMN IF NOT EXISTS media_asset_id UUID REFERENCES lms.media_object(id) ON DELETE SET NULL;

-- Assignment resource link
ALTER TABLE IF EXISTS lms.assignment ADD COLUMN IF NOT EXISTS media_asset_id UUID REFERENCES lms.media_object(id) ON DELETE SET NULL;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_lms_media_object_owner_id ON lms.media_object(owner_id);
CREATE INDEX IF NOT EXISTS idx_lms_media_object_category ON lms.media_object(category);
CREATE INDEX IF NOT EXISTS idx_lms_media_object_status ON lms.media_object(status);
CREATE INDEX IF NOT EXISTS idx_lms_upload_intent_media_object_id ON lms.upload_intent(media_object_id);
CREATE INDEX IF NOT EXISTS idx_lms_upload_intent_status ON lms.upload_intent(status);
CREATE INDEX IF NOT EXISTS idx_lms_media_audit_event_media_object_id ON lms.media_audit_event(media_object_id);
CREATE INDEX IF NOT EXISTS idx_lms_media_audit_event_user_id ON lms.media_audit_event(user_id);
CREATE INDEX IF NOT EXISTS idx_lms_media_audit_event_created_at ON lms.media_audit_event(created_at);
CREATE INDEX IF NOT EXISTS idx_lms_course_media_asset_id ON lms.course(media_asset_id);
CREATE INDEX IF NOT EXISTS idx_lms_class_media_asset_id ON lms.class(media_asset_id);
CREATE INDEX IF NOT EXISTS idx_lms_lesson_media_asset_id ON lms.lesson(media_asset_id);
CREATE INDEX IF NOT EXISTS idx_lms_assignment_media_asset_id ON lms.assignment(media_asset_id);

-- Unique constraints
CREATE UNIQUE INDEX IF NOT EXISTS idx_lms_media_object_r2_key ON lms.media_object(r2_key) WHERE status != 'deleted';
