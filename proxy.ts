import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSupabaseServiceInstance } from "./utils/supabase";
import { randomUUID } from "crypto";

export async function proxy(request: NextRequest) {
  const { pathname, search, host, href } = request.nextUrl;
  const method = request.method;

  // Skip API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Only process GET requests
  if (method === "GET") {
    const supabase = getSupabaseServiceInstance();

    // Check for cookie
    const cookieName = "hash";
    const userHashFromCookies = request.cookies.get(cookieName)?.value;
    const userHash = userHashFromCookies || randomUUID();

    const geo = request.geo || {};
    const userAgent = request.headers.get("user-agent") || "";
    const referrer = request.headers.get("referer") || "";

    // Parse user agent (simplified - you might want to use a library for this)
    const browser = userAgent;
    const os = userAgent;
    const device = userAgent;

    const res = NextResponse.next();
    
    if (!userHashFromCookies) {
      // Set visitor data in supabase
      const { error } = await supabase
        .from("visitors")
        .insert({ id: userHash, geo, browser, referrer, device, os });
      if (error) {
        console.error(error);
      }

      // Set cookie if non existent
      res.cookies.set(cookieName, userHash, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }

    const { error } = await supabase.from("events").insert({
      visitor_id: userHash,
      name: "page " + pathname,
      props: { href, pathname, search, host },
    });

    if (error) {
      console.error(error);
      res.cookies.delete(cookieName);
    }

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

