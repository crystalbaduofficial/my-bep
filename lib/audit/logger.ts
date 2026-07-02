export type AuditEvent = {
  action: string;
  resource_type: string;
  resource_id?: string;
  user_id?: string;
  actor_id?: string;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
};

export async function logAuditEvent(_event: AuditEvent) {
  return;
}
