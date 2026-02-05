import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};

export default async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const url = request.nextUrl;
    const hostname = request.headers.get("host")!;
    const pathname = url.pathname;

    // 1. Subdomain Handling
    let subdomain = undefined;
    if (hostname.includes(".")) {
        const parts = hostname.split(".");
        if (parts.length > 2 || (hostname.includes("localhost") && parts.length > 1)) {
            subdomain = parts[0];
        }
    }

    // Handle "admin" subdomain
    if (subdomain === "admin" && !pathname.startsWith("/(admin)")) {
        // Protect Admin Routes
        if (!user && !pathname.includes("/login")) {
            // Redirect to login if not authenticated
            // We might need a shared login page or admin specific one.
            // For now, redirect to main domain login or just handle it here.
            // Let's assume /login is accessible.
        }
        return NextResponse.rewrite(new URL(`/(admin)${pathname}`, request.url));
    }

    // Handle "nfc" subdomain
    if (subdomain === "nfc" && !pathname.startsWith("/(nfc)")) {
        return NextResponse.rewrite(new URL(`/(nfc)${pathname}`, request.url));
    }

    // 2. Protected Routes (Generic)
    // If accessing /dashboard directy (without subdomain rewritten yet, or if on main domain)
    if (pathname.startsWith("/dashboard") || pathname.includes("/(admin)")) {
        if (!user) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return response;
}
