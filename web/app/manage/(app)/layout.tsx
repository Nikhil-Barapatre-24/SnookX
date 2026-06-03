import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AppShell from "../components/AppShell";
import type { UserRole } from "../lib/types";

export default async function ManageAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) redirect("/manage/login");

  const rawRole = cookieStore.get("user_role")?.value;
  const role: UserRole =
    rawRole === "OWNER" || rawRole === "USER" ? rawRole : "USER";

  return <AppShell role={role}>{children}</AppShell>;
}
