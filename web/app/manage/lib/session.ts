import { cookies } from "next/headers";
import type { UserRole } from "./types";

export interface Session {
  userId: string;
  role: UserRole;
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) return null;

  const rawRole = cookieStore.get("user_role")?.value;
  const userId = cookieStore.get("user_id")?.value ?? "";
  const role: UserRole =
    rawRole === "OWNER" || rawRole === "USER" ? rawRole : "USER";

  return { userId, role };
}
