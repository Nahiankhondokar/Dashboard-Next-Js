import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/me`,
        {
            credentials: "include",
            headers: {
                cookie: req.headers.get("cookie") || "",
            },
        }
    );

    if (res.status !== 200) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
