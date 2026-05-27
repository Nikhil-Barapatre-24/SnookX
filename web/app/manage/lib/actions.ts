"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ActionError, AuthResponse } from "./types";

const BACKEND = process.env.BACKEND_URL ?? "http://localhost:8080";

// ── Login ─────────────────────────────────────────────────────────────────────
export async function loginAction(
  _prev: ActionError | null,
  formData: FormData,
): Promise<ActionError | null> {
  const email    = (formData.get("email")    as string | null)?.trim() ?? "";
  const password = (formData.get("password") as string | null)           ?? "";

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  let data: AuthResponse;

  try {
    const res = await fetch(`${BACKEND}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.toLowerCase(), password }),
      cache: "no-store",
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null) as Record<string, unknown> | null;
      const msg  =
        (typeof body?.error   === "string" ? body.error   : null) ??
        (typeof body?.message === "string" ? body.message : null) ??
        "Invalid email or password.";
      return { error: msg };
    }

    data = (await res.json()) as AuthResponse;
  } catch {
    return { error: "Unable to reach the server. Check your connection and try again." };
  }

  const jar   = await cookies();
  const isProd = process.env.NODE_ENV === "production";
  const base   = { httpOnly: true, secure: isProd, sameSite: "strict" as const, path: "/" };

  jar.set("access_token",  data.accessToken,  { ...base, maxAge: 60 * 15 });
  jar.set("refresh_token", data.refreshToken, { ...base, maxAge: 60 * 60 * 24 * 30 });
  // Non-httpOnly so client components can read them for UI (role badge, user menu)
  jar.set("user_role", data.role,   { ...base, httpOnly: false, maxAge: 60 * 60 * 24 * 30 });
  jar.set("user_id",   data.userId, { ...base, httpOnly: false, maxAge: 60 * 60 * 24 * 30 });

  redirect("/manage/dashboard");
}

// ── Logout ────────────────────────────────────────────────────────────────────
export async function logoutAction(): Promise<void> {
  const jar          = await cookies();
  const refreshToken = jar.get("refresh_token")?.value;

  if (refreshToken) {
    try {
      await fetch(`${BACKEND}/api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
        cache: "no-store",
      });
    } catch {
      // proceed with client-side logout even if backend is unreachable
    }
  }

  jar.delete("access_token");
  jar.delete("refresh_token");
  jar.delete("user_role");
  jar.delete("user_id");

  redirect("/manage/login");
}
