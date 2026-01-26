// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("auth_token")?.value ?? null;
    const { pathname } = req.nextUrl;

    const isAuthPage =
        pathname === "/login" || pathname === "/register";

    const isProtectedRoute = pathname.startsWith("/dashboard");

    // 🔐 Not logged in → block protected routes
    if (isProtectedRoute && !token) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("redirect", pathname);

        return NextResponse.redirect(loginUrl);
    }

    // 🚫 Logged in → block auth pages
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/register"],
};
