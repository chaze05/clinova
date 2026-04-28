import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
//   const token = request.cookies.get("token")?.value;
// //   const token = request.cookies.get("laravel_session")?.value;

//   const isAuthPage = request.nextUrl.pathname.startsWith("/login");
//   const isProtectedRoute =
//     request.nextUrl.pathname.startsWith("/dashboard") ||
//     request.nextUrl.pathname.startsWith("/appointments") ||
//     request.nextUrl.pathname.startsWith("/slots");

//   if (isProtectedRoute && !token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (isAuthPage && token) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/appointments/:path*",
    "/slots/:path*",
    "/patients/:path*",
    "/login",
  ],
};