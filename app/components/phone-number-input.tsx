"use client";

import { Input } from "@nextui-org/input";


export default function PhoneNumberInput() {
  return (
    <Input
      className="p-2"
      type="middleName"
      id="middleName"
      name="middleName"
      placeholder="Номер телефона"
    />
  );
}
