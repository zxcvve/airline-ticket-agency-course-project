"use client";

import sql from "@/app/lib/db";
import { SessionData, defaultSession, sessionOptions } from "@/app/lib/session";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";
import { getUserInfo, updateUserInfo } from "@/app/lib/actions";
import { set } from "zod";
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

async function handleSubmit(event: any, props: any) {
  event.preventDefault();
  console.log(event.target[1].value);
  // console.log(
  //   `${firstName} ${secondName} ${middleName} ${phone} ${gender.currentKey}`,
  // );
  // const res = updateUserInfo(
  //   props.session.userId,
  //   firstName,
  //   secondName,
  //   middleName,
  //   phone,
  //   [...gender.entries()][0][1],
  // );
}



function Form(props: any) {
  const genderList: string[] = ["Мужской", "Женский"];

  useEffect(() => {
    setFirstName(props.userInfo.first_name);
    setSecondName(props.userInfo.second_name);
    setMiddleName(props.userInfo.middle_name);
    setPhone(props.userInfo.phone);
    // setGender(props.userInfo.gender)
  }, []);

  const [firstName, setFirstName] = useState<string>("");
  const [secondName, setSecondName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<any>("");

  
  function handleInputChange(event: any) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
            <SelectItem key={gender}>{gender}</SelectItem>
          ))}
        </Select>

        <div className="flex justify-center">
          <Button
            // onClick={() => {
            //   console.log(
            //     `${firstName} ${secondName} ${middleName} ${phone} ${gender.currentKey}`,
            //   );
            //   const res = updateUserInfo(
            //     props.session.userId,
            //     firstName,
            //     secondName,
            //     middleName,
            //     phone,
            //     [...gender.entries()][0][1]
            //   )

            // }}
            className="w-fit flex justify-center"
            type="submit"
          >
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}
