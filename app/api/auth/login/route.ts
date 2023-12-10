import { NextResponse } from "next/server";
import { loginUser } from "@/app/lib/actions";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const res = await loginUser(email, password);

  return NextResponse.json({ res });
}
