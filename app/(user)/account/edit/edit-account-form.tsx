"use client";

import { updateUserInfo } from "@/app/lib/actions";
import { UserWithoutPassword } from "@/app/lib/definitions";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useMemo, useState } from "react";

function GenderAutocomplete({
  genders,
  fun,
  label,
  selectedKey,
  name,
}: {
  genders: any[];
  fun: any;
  label: string;
  selectedKey: number;
  name: string;
}) {
  return (
    <Autocomplete
      label={label}
      onSelectionChange={fun}
      selectedKey={String(selectedKey)}
      defaultItems={genders}
    >
      {(gender) => (
        <AutocompleteItem key={gender.id}>{gender.name}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}

export default function EditUserInfoForm({
  userData,
}: {
  userData: UserWithoutPassword;
}) {
  const genderList = [
    { id: 0, name: "Женский" },
    { id: 1, name: "Мужской" },
  ];

  const [firstName, setFirstName] = useState(userData.first_name);
  const [secondName, setSecondName] = useState(userData.last_name);
  const [middleName, setMiddleName] = useState(userData.middle_name);
  const [phoneNumber, setPhone] = useState(userData.phone_number);
  const [gender, setGender] = useState(userData.ismale ? 1 : 0);
  const [formError, setFormError] = useState<string>("");

  const [formState, setFormState] = useState<string>("");

  async function handleFormSubmission(event: any) {
    event.preventDefault();

    setFormError("");
    setFormState("");

    if (phoneIsInvalid) {
      setFormError("Неверный формат номера телефона");
      return;
    }

    if (
      firstName === "" ||
      secondName === "" ||
      middleName === "" ||
      phoneNumber === ""
    ) {
      setFormError("Заполните все поля");
      return;
    }

    const isMale = Number(gender) === 1 ? true : false;

    const res = await updateUserInfo(
      userData.id,
      firstName,
      secondName,
      middleName,
      phoneNumber,
      isMale,
    );

    setFormState(res);
  }

  const phoneIsInvalid = useMemo(() => {
    const regex = /^(\+7|8)(\d{10})$/;
    return !regex.test(phoneNumber);
  }, [phoneNumber]);

  return (
    <form className="flex flex-col gap-2" onSubmit={handleFormSubmission}>
      <Input
        type="text"
        id="firstName"
        name="firstName"
        label="Имя"
        value={firstName}
        onValueChange={setFirstName}
      />
      <Input
        type="text"
        id="secondName"
        name="secondName"
        label="Фамилия"
        value={secondName}
        onValueChange={setSecondName}
      />
      <Input
        type="text"
        id="middleName"
        name="middleName"
        label="Отчество"
        value={middleName}
        onValueChange={setMiddleName}
      />
      <Input
        type="text"
        id="phoneNumber"
        name="phoneNumber"
        label="Номер телефона"
        isInvalid={phoneIsInvalid}
        value={phoneNumber}
        onValueChange={setPhone}
      />

      <GenderAutocomplete
        genders={genderList}
        fun={setGender}
        selectedKey={gender}
        label="Пол"
        name=""
      />

      <Button type="submit">Сохранить</Button>
      {formState && (
        <>
          <p className="text-sm text-success-500">{formState}</p>
        </>
      )}
      {formError && (
        <>
          <p className="text-sm text-danger-500">{formError}</p>
        </>
      )}
    </form>
  );
}
