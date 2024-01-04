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
import { cookies } from "next/headers";

// import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/react";
import UserDropdown from "../components/user-dropdown";

async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return session;
}

async function Content() {
  const session = await getSession();

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
          <UserDropdown />
        </NavbarItem>
      )}
    </>
  );
}

export default function NavigationBar() {
  // const {session, isLoading} = useSession();

  // TODO: find a way to use environment variables in github actions
  // const indexPath = "https://zxcvve.github.io/airline-ticket-agency-course-project/";

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Жмых Airlines</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href={"/"}>Главная</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/orders" aria-current="page">
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
        <Content />
      </NavbarContent>
      {/*<Content/>*/}
    </Navbar>
  );
}
