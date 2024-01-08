import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { SessionData, sessionOptions } from "./app/lib/session";

export async function middleware(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  // редирект на страницу логина, если пользователь не авторизован и пытается зайти на страницу, требующую авторизации
  if (!session.isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url), 302);
  }

  // редирект на домашнюю страницу, если пользователь авторизован и пытается зайти на страницу админа
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    session.role !== "Admin"
  ) {
    return NextResponse.redirect(new URL("/", request.url), 302);
  }
}

export const config = {
  matcher: [
    "/account/:path*",
    "/new-order/:path*",
    "/orders/:path*",
    "/admin/:path*",
  ],
};
