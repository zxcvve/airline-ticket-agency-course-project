import { UserWithoutPassword } from "@/app/lib/definitions";
import { cookies } from "next/headers";
import EditUserInfoForm from "./edit-account-form";

export default async function EditAccountPage(){
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

  return(
    <EditUserInfoForm userData={userData}/>
  )

}