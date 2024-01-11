"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useFormState } from "react-dom";
import { handleRegister } from "@/app/lib/handlers";

export default function RegistrationForm() {
  const [formState, formAction] = useFormState(handleRegister, undefined);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Регистрация</h1>
        <div className="flex flex-col justify-center items-center">
          <form
            className="flex flex-col justify-center items-center"
            action={formAction}
          >
            <Input
              className="p-2"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              label="Email"
            />

            <Input
              className="p-2"
              type="password"
              id="password"
              name="password"
              placeholder="Пароль"
              label="Пароль"
            />
            <Button className="" type="submit">
              Войти
            </Button>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {formState && (
                <>
                  {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
                  <p className="text-sm text-red-500">{formState}</p>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
