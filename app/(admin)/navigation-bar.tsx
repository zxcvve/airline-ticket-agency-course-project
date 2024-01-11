"use server";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/app/lib/session";
import { cookies, headers } from "next/headers";

// import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/react";
import UserDropdown from "../components/user-dropdown";

async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return session;
}

async function Content(props: any) {
  const session = await getSession();
  const userData = props;
  return (
    <>
      {!session.isLoggedIn && (
        <>
          <NavbarItem className="hidden lg:flex">
            <Link href="login">Вход</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="register" variant="flat">
              Регистрация
            </Button>
          </NavbarItem>
        </>
      )}

      {session.isLoggedIn && (
        <NavbarItem>
          <UserDropdown props={userData} />
        </NavbarItem>
      )}
    </>
  );
}

async function getCookie(name: string) {
  return cookies().get(name)?.value ?? "";
}

async function getUrl() {
  const url =
    process.env.NODE_ENV === "production"
      ? process.env.URL
      : "http://localhost:3000";
  return url;
}

export default async function NavigationBar() {
  const cookie = await getCookie("air-app-session");
  const url = await getUrl();
  const userData = await fetch(`${url}/api/auth/me`, {
    headers: {
      Cookie: `air-app-session=${cookie};`,
    },
    next: {
      tags: ["userData"],
    },
  }).then((res) => res.json());

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Крутое пике</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href={"/admin"}>Главная</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Content props={userData} />
      </NavbarContent>
    </Navbar>
  );
}
