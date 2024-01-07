"use server";

import { redirect } from "next/navigation";

export async function redirectToLogin() {
  return redirect("/login");
}
