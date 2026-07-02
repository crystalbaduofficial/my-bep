export const pool = {
  async query(_text?: string, _values?: unknown[]) {
    return { rows: [] as any[] };
  },
};

export const db = pool;
