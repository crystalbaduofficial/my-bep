import { NextRequest } from "next/server";

export type Session = {
  userId: string;
};

export async function verifySessionValid(_request: NextRequest): Promise<Session | null> {
  return null;
}
