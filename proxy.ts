
import { NextRequest, NextResponse } from "next/server";

type UserRole = "PATIENT" | "DRIVER" | "ADMIN";

const roleBasePath: Record<UserRole, string> = {
  PATIENT: "/dashboard",
  DRIVER: "/provider",
  ADMIN: "/admin",
};

//  path  role- protected
const protectedRoutes: { prefix: string; role: UserRole }[] = [
  { prefix: "/dashboard", role: "PATIENT" },
  { prefix: "/provider", role: "DRIVER" },
  { prefix: "/admin", role: "ADMIN" },
];

const authRoutes = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("rescuego_token")?.value;
  const roleCookie = request.cookies.get("rescuego_role")?.value as | UserRole | undefined;

  const isAuthenticated = Boolean(token);

  //Login completed now not redirect to login or register page
  if (isAuthenticated && authRoutes.includes(pathname)) {
    const redirectPath = roleCookie ? roleBasePath[roleCookie] : "/";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  //Protected route check
  const matchedRoute = protectedRoutes.find((route) =>
    pathname.startsWith(route.prefix)
  );

  if (matchedRoute) {
    // not login-> login
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // logged in but role mismatch -  redirect own dashboard
    if (roleCookie && roleCookie !== matchedRoute.role) {
      return NextResponse.redirect(
        new URL(roleBasePath[roleCookie], request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/provider/:path*", "/admin/:path*", "/login", "/register"],
};