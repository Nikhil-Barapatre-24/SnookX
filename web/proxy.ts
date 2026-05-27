import { type NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/manage/login"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  // Unauthenticated user hitting a protected manage route
  if (!token && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = "/manage/login";
    return NextResponse.redirect(url);
  }

  // Authenticated user hitting the login page — send to dashboard
  if (token && pathname === "/manage/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/manage/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/manage/:path*"],
};
