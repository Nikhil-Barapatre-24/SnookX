import { type NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/manage/login"];

/** Routes only OWNER may visit. Any other authenticated role is redirected. */
const OWNER_ONLY_PATHS = ["/manage/finance", "/manage/settings"];

function matchesPath(pathname: string, paths: string[]) {
  return paths.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;
  const role  = request.cookies.get("user_role")?.value;

  // 1. Unauthenticated → login
  if (!token && !matchesPath(pathname, PUBLIC_PATHS)) {
    const url = request.nextUrl.clone();
    url.pathname = "/manage/login";
    return NextResponse.redirect(url);
  }

  // 2. Authenticated hitting login → dashboard
  if (token && pathname === "/manage/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/manage/dashboard";
    return NextResponse.redirect(url);
  }

  // 3. Non-OWNER hitting an OWNER-only route → dashboard (403-like)
  if (token && role !== "OWNER" && matchesPath(pathname, OWNER_ONLY_PATHS)) {
    const url = request.nextUrl.clone();
    url.pathname = "/manage/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/manage/:path*"],
};
