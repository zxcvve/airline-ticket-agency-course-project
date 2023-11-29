"use client";

import {usePathname} from "next/navigation";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";
import {Button} from "@nextui-org/button";
import {Link} from "@nextui-org/link";


export default function NavigationBar() {
  const path = usePathname();
  // TODO: find a way to use environment variables in github actions
  // const indexPath = "https://zxcvve.github.io/airline-ticket-agency-course-project/";

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Жмых Airlines</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={path == "/"}>
          <Link href={"/"}>
            Главная
          </Link>
        </NavbarItem>
        <NavbarItem isActive={path == "/orders"}>
          <Link href="orders" aria-current="page">
            Заказы
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
          <Link href="login">Вход</Link>
        </NavbarItem>
        <NavbarItem isActive={path == "/register"}>
          <Button as={Link} color="primary" href="register" variant="flat">
            Регистрация
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}