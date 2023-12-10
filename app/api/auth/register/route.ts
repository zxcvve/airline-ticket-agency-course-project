import { NextResponse } from "next/server";
import { registerUser } from "@/app/lib/actions";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const res = await registerUser(email, password);

  return NextResponse.json({ res });
}
