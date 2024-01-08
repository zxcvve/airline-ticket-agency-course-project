"use client";

import { User } from "@nextui-org/user";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { userWithoutPassword } from "../lib/definitions";

export default function UserDropdown({ props }: any) {
  const userInfo: userWithoutPassword = props.props;

  return (
    <Dropdown>
      <DropdownTrigger>
        <User name={`${userInfo.first_name} ${userInfo.last_name}`} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="account" href="/account">
          Аккаунт
        </DropdownItem>
        <DropdownItem key="logout" href="/api/auth/logout">
          Выйти
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
