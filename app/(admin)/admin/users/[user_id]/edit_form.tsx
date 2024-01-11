"use client";

import { updateAirplaneInfo, updateUserInfo } from "@/app/lib/actions";
import { Airplane, UserWithoutPassword } from "@/app/lib/definitions";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";

export default function EditUserForm({
  props,
}: {
  props: UserWithoutPassword;
}) {
  const [firstName, setFirstName] = useState(props.first_name);
  const [lastName, setLastName] = useState(props.last_name);
  const [middleName, setMiddleName] = useState(props.middle_name);
  const [phone, setPhone] = useState(props.phone_number);
  const [email, setEmail] = useState(props.email);
  const [gender, setGender] = useState<any>(props.ismale ? ["1"] : ["0"]);
  const [role, setRole] = useState(props.role)

  const [formState, setFormState] = useState<string>("");

  const genderList = [
    { id: 0, name: "Женский" },
    { id: 1, name: "Мужской" },
  ];

  async function handleFormSubmission(event: any) {
    event.preventDefault();
    const id = props.id;
    const first_name = event.target.first_name.value;
    const last_name = event.target.last_name.value;
    const middle_name = event.target.middle_name.value;
    const phone_number = event.target.phone.value;
    const email = event.target.email.value;
    const isMale = Number(event.target.gender.value) ? true : false;

    const res = await updateUserInfo(
      id,
      first_name,
      last_name,
      middle_name,
      phone_number,
      isMale,
      email,
    );
    setFormState(res);
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleFormSubmission}>
      <Input name="id" isDisabled={true} label="ID" value={String(props.id)} />
      <Input
        name="first_name"
        label="Имя"
        value={firstName}
        onValueChange={setFirstName}
      />
      <Input
        name="last_name"
        label="Фамилия"
        value={lastName}
        onValueChange={setLastName}
      />
      <Input
        name="middle_name"
        label="Отчество"
        value={middleName}
        onValueChange={setMiddleName}
      />
      <Input
        name="phone"
        label="Телефон"
        value={phone}
        onValueChange={setPhone}
      />
      <Input
        name="email"
        label="Email"
        value={email}
        onValueChange={setEmail}
      />
      <Input name="role" label="Роль" value={role} onValueChange={setRole}/>
      <Select
        name="gender"
        selectedKeys={gender}
        onSelectionChange={setGender}
        label="Пол"
      >
        {genderList.map((gender) => (
          <SelectItem key={gender.id}>{gender.name}</SelectItem>
        ))}
      </Select>
      <Button type="submit">Сохранить</Button>
      {formState && (
        <>
          <p className="text-sm text-success-500">{formState}</p>
        </>
      )}
    </form>
  );
}
