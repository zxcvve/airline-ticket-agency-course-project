import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { SessionData, sessionOptions } from "./app/lib/session";
import { redirect } from "next/dist/server/api-utils";

export async function middleware(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url), 302);
  }

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    session.role !== "Admin"
  ) {
    return NextResponse.redirect(new URL("/", request.url), 302);
  }
}

export const config = {
  matcher: ["/account/:path*", "/new-order/:path*", "/orders/:path*", "/admin/:path*"],
};
