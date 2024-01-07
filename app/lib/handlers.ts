"use server";

import { loginUser, registerUser } from "@/app/lib/actions";
import { redirect } from "next/navigation";

export async function handleLogin(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const res = await loginUser(email, password);
  return res;
}

export async function handleRegister(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const res = await registerUser(email, password);
  if (res === 0) {
    redirect("/account/edit");
  }
  return res;
}
