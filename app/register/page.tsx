"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";

export default async function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [state, dispatch] = useFormState(registerUser, undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Регистрация</h1>
        <div className="flex flex-col justify-center items-center">
          <form className="flex flex-col justify-center items-center">
            <Input className="p-2" type="email" placeholder="Логин" />
            <Input className="p-2" type="password" placeholder="Пароль" />
            <Button type="submit" onClick={(e) => handleSubmit(e)}>
              Регистрация
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
