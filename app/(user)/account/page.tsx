"use server";

import { UserWithoutPassword } from "@/app/lib/definitions";
import { Link } from "@nextui-org/react";
import { cookies } from "next/headers";

export default async function AccountPage() {
  async function getUrl() {
    const url =
      process.env.NODE_ENV === "production"
        ? process.env.URL
        : "http://localhost:3000";
    return url;
  }
  const url = await getUrl();

  async function getCookie(name: string) {
    return cookies().get(name)?.value ?? "";
  }
  const cookie = await getCookie("air-app-session");

  const userData: UserWithoutPassword = await fetch(`${url}/api/auth/me`, {
    headers: {
      Cookie: `air-app-session=${cookie};`,
    },
    next: {
      tags: ["userData"],
    },
  }).then((res) => res.json());

  return (
    <div>
      <h1 className="text-center">Аккаунт</h1>
      <p>
        ФИО: {userData.last_name} {userData.first_name} {userData.middle_name}
      </p>
      <p>Email: {userData.email}</p>
      <p>Пол: {userData.ismale ? "Мужской" : "Женский"}</p>
      <p>Номер телефона: {userData.phone_number}</p>
      <Link href="/account/edit">Редактировать аккаунт</Link>
    </div>
  );
}
