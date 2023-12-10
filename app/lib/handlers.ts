"use server";

import { loginUser, registerUser } from "@/app/lib/actions";

// server actions axample: https://github.com/vercel/next.js/blob/canary/examples/next-forms/app/actions.ts#L12
// TODO: implement login and register handlers

export async function handleLogin(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const res = await loginUser(email, password);
}
