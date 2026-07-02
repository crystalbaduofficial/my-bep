export type AuthSession = {
  user: {
    id: string;
    email?: string;
  };
};

export const auth = {
  api: {
    async getSession(_options?: { headers?: Headers }): Promise<AuthSession | null> {
      return null;
    },
  },
  session: {
    async getSession(): Promise<AuthSession | null> {
      return null;
    },
  },
};
