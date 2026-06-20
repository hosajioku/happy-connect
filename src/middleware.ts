import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!token && (path.startsWith("/dashboard") || path.startsWith("/profile") || path.startsWith("/matches") || path.startsWith("/upgrade") || path.startsWith("/bookings") || path.startsWith("/notifications") || path.startsWith("/settings"))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        if (path.startsWith("/admin")) return token?.role === "ADMIN";
        if (path.startsWith("/dashboard") || path.startsWith("/profile") || path.startsWith("/matches") || path.startsWith("/upgrade") || path.startsWith("/bookings") || path.startsWith("/notifications") || path.startsWith("/settings")) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/matches/:path*", "/upgrade/:path*", "/bookings/:path*", "/notifications/:path*", "/settings/:path*", "/admin/:path*"],
};
