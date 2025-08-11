// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;
    const isAuth = !!token;
    const pathname = request.nextUrl.pathname;
    const isProtectedPath = pathname.startsWith("/user");
    const isLoginPath = pathname === "/auth/login";
    const isSignupPath = pathname === "/auth/signup";
    
    // Redirect unauthenticated users from protected routes
    if (isProtectedPath && !isAuth) {
        const loginUrl = new URL("/auth/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect authenticated users away from login page
    if (isLoginPath || isSignupPath && isAuth) {
        const dashboardUrl = new URL("/user/dashboard", request.url);
        return NextResponse.redirect(dashboardUrl);
    }
    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: ["/user/:path*",],
};
