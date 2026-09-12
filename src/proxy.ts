import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected admin routes - require authentication
const PROTECTED_ROUTES = ["/admin"];
// Public admin routes - accessible without auth
const PUBLIC_ADMIN_ROUTES = ["/admin/login"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a protected admin route
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicAdminRoute = PUBLIC_ADMIN_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // If it's a public admin route (login page), allow through
  if (isPublicAdminRoute) {
    // If already authenticated (has session cookie), redirect to dashboard
    const sessionCookie = request.cookies.get("admin_session");
    if (sessionCookie) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // For protected routes, check for session cookie
  if (isProtectedRoute) {
    const sessionCookie = request.cookies.get("admin_session");
    if (!sessionCookie) {
      // Not authenticated - redirect to login
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
