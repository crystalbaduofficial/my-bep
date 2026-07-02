import { db } from "@/lib/db";
import { generatePresignedUrl, verifyUploadToR2 } from "@/lib/storage/r2";
import { v4 as uuid } from "uuid";

export interface CreateUploadIntentParams {
  filename: string;
  mimeType: string;
  fileSizeBytes: number;
  category: "cover" | "lesson" | "resource" | "submission";
  userId: string;
  dimensions?: { width: number; height: number };
}

export interface CompleteUploadParams {
  intentId: string;
  userId: string;
  r2Etag?: string;
  verified: boolean;
}

export interface GetSignedUrlParams {
  mediaId: string;
  userId?: string;
  expiresIn?: number; // seconds, default 900
}

/**
 * Create an upload intent with presigned URL
 * Returns presigned URL for direct browser upload to R2
 */
export async function createUploadIntent(params: CreateUploadIntentParams) {
  const { filename, mimeType, fileSizeBytes, category, userId, dimensions } =
    params;

  // Validate file size by category
  const maxSizes: Record<string, number> = {
    cover: 12 * 1024 * 1024, // 12MB
    lesson: 250 * 1024 * 1024, // 250MB
    resource: 100 * 1024 * 1024, // 100MB
    submission: 50 * 1024 * 1024, // 50MB
  };

  if (fileSizeBytes > (maxSizes[category] || 10 * 1024 * 1024)) {
    throw new Error(
      `File too large. Max size for ${category}: ${maxSizes[category] / 1024 / 1024}MB`
    );
  }

  // Generate object key
  const objectId = uuid();
  const sanitizedFilename = sanitizeFilename(filename);
  const objectKey = `${category}/${objectId}/${sanitizedFilename}`;

  // Create media object record
  const mediaObject = await db.query(
    `
    INSERT INTO lms.media_object
    (category, media_type, original_filename, file_size_bytes, dimensions, r2_key, owner_id, status, visibility)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id, r2_key
  `,
    [
      category,
      mimeType,
      filename,
      fileSizeBytes,
      JSON.stringify(dimensions || {}),
      objectKey,
      userId,
      "uploading",
      "private",
    ]
  );

  if (!mediaObject.rows[0]) {
    throw new Error("Failed to create media object record");
  }

  const mediaId = mediaObject.rows[0].id;

  // Generate presigned URL (300 seconds = 5 minutes for upload)
  const presignedUrl = generatePresignedUrl({
    bucket: process.env.MEDIA_R2_BUCKET || "bep-media",
    key: objectKey,
    method: "PUT",
    expiresIn: 300,
    contentType: mimeType,
  });

  // Create upload intent record
  const intent = await db.query(
    `
    INSERT INTO lms.upload_intent (media_object_id, presigned_url, url_expires_at, status)
    VALUES ($1, $2, NOW() + INTERVAL '5 minutes', $3)
    RETURNING id
  `,
    [mediaId, presignedUrl, "pending"]
  );

  // Log audit event
  await logMediaAuditEvent(mediaId, userId, "upload_intent", null, null, {
    filename,
    fileSize: fileSizeBytes,
    category,
  });

  return {
    intentId: intent.rows[0]?.id,
    mediaId,
    presignedUrl,
    expiresIn: 300,
  };
}

/**
 * Complete upload verification
 * Called after browser finishes upload to R2
 */
export async function completeUpload(params: CompleteUploadParams) {
  const { intentId, userId, r2Etag, verified } = params;

  // Get intent and media object
  const intent = await db.query(
    `
    SELECT umi.id, umi.media_object_id, mo.r2_key, mo.owner_id, mo.file_size_bytes
    FROM lms.upload_intent umi
    JOIN lms.media_object mo ON umi.media_object_id = mo.id
    WHERE umi.id = $1
  `,
    [intentId]
  );

  if (!intent.rows[0]) {
    throw new Error("Upload intent not found");
  }

  const { media_object_id, r2_key, owner_id, file_size_bytes } = intent.rows[0];

  // Permission check
  if (owner_id !== userId) {
    throw new Error("Unauthorized");
  }

  if (!verified) {
    // Mark as failed
    await db.query(
      `
      UPDATE lms.media_object SET status = $1, error_message = $2 WHERE id = $3
    `,
      [
        "deleted",
        "Upload verification failed",
        media_object_id,
      ]
    );

    throw new Error("Upload verification failed");
  }

  // Verify upload to R2
  const uploadVerified = await verifyUploadToR2({
    bucket: process.env.MEDIA_R2_BUCKET || "bep-media",
    key: r2_key,
    expectedSize: file_size_bytes,
  });

  if (!uploadVerified) {
    await db.query(
      `
      UPDATE lms.media_object SET status = $1, error_message = $2 WHERE id = $3
    `,
      [
        "deleted",
        "File verification failed in storage",
        media_object_id,
      ]
    );

    throw new Error("File verification failed");
  }

  // Update status to active
  await db.query(
    `
    UPDATE lms.media_object
    SET status = $1, r2_etag = $2, updated_at = NOW()
    WHERE id = $3
  `,
    ["active", r2Etag || "", media_object_id]
  );

  await db.query(
    `
    UPDATE lms.upload_intent
    SET status = $1, verified_at = NOW(), uploaded_at = NOW()
    WHERE id = $2
  `,
    ["verified", intentId]
  );

  // Log audit event
  await logMediaAuditEvent(media_object_id, userId, "upload_complete", null, null, {
    verified: true,
    etag: r2Etag,
  });

  return { mediaId: media_object_id, status: "active" };
}

/**
 * Get signed URL for media access
 * Ensures permission checks before returning URL
 */
export async function getSignedUrl(params: GetSignedUrlParams) {
  const { mediaId, userId, expiresIn = 900 } = params; // 15 minutes default

  // Get media object
  const media = await db.query(
    `
    SELECT id, r2_key, owner_id, visibility, status
    FROM lms.media_object
    WHERE id = $1
  `,
    [mediaId]
  );

  if (!media.rows[0]) {
    throw new Error("Media not found");
  }

  const { r2_key, owner_id, visibility, status } = media.rows[0];

  // Permission checks
  if (status !== "active") {
    throw new Error("Media not available");
  }

  if (visibility === "private" && owner_id !== userId) {
    throw new Error("Unauthorized");
  }

  // Generate signed URL (900 seconds = 15 minutes for download)
  const signedUrl = generatePresignedUrl({
    bucket: process.env.MEDIA_R2_BUCKET || "bep-media",
    key: r2_key,
    method: "GET",
    expiresIn: Math.min(expiresIn, 3600), // Max 1 hour
  });

  // Log audit access
  await logMediaAuditEvent(mediaId, userId || owner_id, "access", null, null, {
    expiresIn,
  });

  return { signedUrl, expiresIn: Math.min(expiresIn, 3600) };
}

/**
 * Attach media to course cover
 */
export async function attachCourseCover(
  courseId: string,
  mediaId: string,
  userId: string
) {
  // Verify course ownership
  const course = await db.query(
    `SELECT created_by FROM lms.course WHERE id = $1`,
    [courseId]
  );

  if (!course.rows[0] || course.rows[0].created_by !== userId) {
    throw new Error("Unauthorized");
  }

  // Verify media ownership
  const media = await db.query(
    `SELECT id, status FROM lms.media_object WHERE id = $1 AND owner_id = $2`,
    [mediaId, userId]
  );

  if (!media.rows[0] || media.rows[0].status !== "active") {
    throw new Error("Invalid media");
  }

  // Attach to course
  await db.query(
    `UPDATE lms.course SET media_asset_id = $1, updated_at = NOW() WHERE id = $2`,
    [mediaId, courseId]
  );

  // Log audit event
  await logMediaAuditEvent(mediaId, userId, "attach", "course_cover", courseId);

  return { success: true, courseId, mediaId };
}

/**
 * Attach media to class cover
 */
export async function attachClassCover(
  classId: string,
  mediaId: string,
  userId: string
) {
  // Verify class ownership
  const cls = await db.query(
    `SELECT created_by FROM lms.class WHERE id = $1`,
    [classId]
  );

  if (!cls.rows[0] || cls.rows[0].created_by !== userId) {
    throw new Error("Unauthorized");
  }

  // Verify media ownership
  const media = await db.query(
    `SELECT id, status FROM lms.media_object WHERE id = $1 AND owner_id = $2`,
    [mediaId, userId]
  );

  if (!media.rows[0] || media.rows[0].status !== "active") {
    throw new Error("Invalid media");
  }

  // Attach to class
  await db.query(
    `UPDATE lms.class SET media_asset_id = $1, updated_at = NOW() WHERE id = $2`,
    [mediaId, classId]
  );

  // Log audit event
  await logMediaAuditEvent(mediaId, userId, "attach", "class_cover", classId);

  return { success: true, classId, mediaId };
}

/**
 * Internal helper: log audit events
 */
async function logMediaAuditEvent(
  mediaId: string,
  userId: string,
  eventType: string,
  resourceType: string | null,
  resourceId: string | null,
  metadata: Record<string, any> = {}
) {
  await db.query(
    `
    INSERT INTO lms.media_audit_event
    (media_object_id, event_type, user_id, resource_type, resource_id, metadata)
    VALUES ($1, $2, $3, $4, $5, $6)
  `,
    [mediaId, eventType, userId, resourceType, resourceId, JSON.stringify(metadata)]
  );
}

/**
 * Sanitize filename for safe storage
 */
function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_{2,}/g, "_")
    .substring(0, 255);
}
