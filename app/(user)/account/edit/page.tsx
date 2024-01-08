"use client";

import { SessionData, defaultSession, sessionOptions } from "@/app/lib/session";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useEffect, useState } from "react";
import { getUserInfo, updateUserInfo } from "@/app/lib/actions";
import { redirectToLogin } from "../../lib/actions";

export default function EditUserInfo() {
  const [session, setSession] = useState<SessionData>(defaultSession);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>([]);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((session) => {
        setSession(session);
        getUserInfo(session.userId).then((userData) => {
          setUserInfo(userData);
          setIsLoading(false);
        });
      });
  }, []);
  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (session.isLoggedIn) {
    const props = {
      userInfo,
      session,
    };
    return <Form {...props} />;
  }

  redirectToLogin();
}

function Form(props: any) {
  const [firstName, setFirstName] = useState<string>("");
  const [secondName, setSecondName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<any>("");

  const [result, setResult] = useState<any>("");

  const genderList = [
    { id: 0, name: "Женский" },
    { id: 1, name: "Мужской" },
  ];

  useEffect(() => {
    setFirstName(props.userInfo.first_name);
    setSecondName(props.userInfo.last_name);
    setMiddleName(props.userInfo.middle_name);
    setPhone(props.userInfo.phone_number);
    setGender(props.userInfo.ismale ? ["1"] : ["0"]);
  }, []);

  async function handleSubmit(event: any) {
    event.preventDefault();
    const firstName = event.target[0].value;
    const secondName = event.target[1].value;
    const middleName = event.target[2].value;
    const phone = event.target[3].value;
    const isMale = Number(event.target[4].value) ? true : false;


    const session = await fetch("/api/auth/session").then((res) => res.json());
    // TODO: revalidate tag to update user info on navigation bar without page reload
    const res = await updateUserInfo(
      session.userId,
      firstName,
      secondName,
      middleName,
      phone,
      isMale,
    );
    setResult(res);
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <Input
          className="p-2"
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Имя"
          value={firstName}
          onValueChange={setFirstName}
        />
        <Input
          className="p-2"
          type="text"
          id="secondName"
          name="secondName"
          placeholder="Фамилия"
          value={secondName}
          onValueChange={setSecondName}
        />
        <Input
          className="p-2"
          type="text"
          id="middleName"
          name="middleName"
          placeholder="Отчество"
          value={middleName}
          onValueChange={setMiddleName}
        />
        <Input
          className="p-2"
          type="tel"
          id="phone"
          name="phone"
          placeholder="Номер телефона"
          value={phone}
          onValueChange={setPhone}
        />
        <Select
          id="gender"
          selectedKeys={gender}
          onSelectionChange={setGender}
          className="p-2"
          label="Пол"
        >
          {genderList.map((gender) => (
            <SelectItem key={gender.id}>{gender.name}</SelectItem>
          ))}
        </Select>

        <div className="flex justify-center">
          <Button className="w-fit flex justify-center" type="submit">
            Сохранить
          </Button>
        </div>
        <div className="justify-center flex p-4">
          {result && (
            <>
              <p className="text-sm text-green-500">{result}</p>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
