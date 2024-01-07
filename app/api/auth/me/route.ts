"use server";

import { getUserInfo } from "@/app/lib/actions";
import { SessionData, defaultSession, sessionOptions } from "@/app/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function GET() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession);
  }

  const res = await getUserInfo(session.userId);
  return Response.json(res);
}
