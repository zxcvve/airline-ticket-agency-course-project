"use client";

import {usePathname} from "next/navigation";
import {Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";


export default function NavigationBar() {
  const path = usePathname();

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Жмых Airlines</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={path == "/"}>
          <Link href="/">

          </Link>
        </NavbarItem>
        <NavbarItem isActive={path == "/orders"}>
          <Link href="/orders" aria-current="page">
            {path}
          </Link>
        </NavbarItem>
        {/*<NavbarItem>*/}
        {/*  <Link color="foreground" href="#">*/}
        {/*    Integrations*/}
        {/*  </Link>*/}
        {/*</NavbarItem>*/}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem isActive={path == "/login"} className="hidden lg:flex">
          <Link href="/login">Вход</Link>
        </NavbarItem>
        <NavbarItem isActive={path == "/register"}>
          <Button as={Link} color="primary" href="#" variant="flat">
            Регистрация
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}