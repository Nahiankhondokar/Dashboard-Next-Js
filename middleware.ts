import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const rawToken = req.cookies.get("auth_token")?.value;
    const token = rawToken && rawToken.length > 0 ? rawToken : null;

    const pathname = req.nextUrl.pathname;

    // 🔐 Protect dashboard
    if (pathname.startsWith("/dashboard") && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // 🚫 Prevent login/register when logged in
    if ((pathname === "/login" || pathname === "/register") && token) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/register"],
};
