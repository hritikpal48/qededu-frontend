// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    const isAuth = !!token;
    const isProtectedPath = request.nextUrl.pathname.startsWith("/user");

    if (isProtectedPath && !isAuth) {
        const loginUrl = new URL("/", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// middleware.ts (continued)
export const config = {
    matcher: ["/user/:path*"], 
};
