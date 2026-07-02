import { NextRequest } from "next/server";

export type Session = {
  userId: string;
  user: {
    id: string;
  };
};

export async function getSession(_request?: NextRequest): Promise<Session | null> {
  return null;
}
