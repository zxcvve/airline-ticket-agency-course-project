"use client";


import {User} from "@nextui-org/user";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/dropdown";

export default function UserDropdown() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <User
          name="John Doe"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="account" href="/account">Аккаунт</DropdownItem>
        <DropdownItem key="logout" href="api/auth/logout">Выйти</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}