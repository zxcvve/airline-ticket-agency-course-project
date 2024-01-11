"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useFormState } from "react-dom";
import { handleLogin } from "@/app/lib/handlers";

export default function LoginForm() {
  const [formState, formAction] = useFormState(handleLogin, undefined);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Вход</h1>
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
              label="Email"
            />

            <Input
              className="p-2"
              type="password"
              id="password"
              name="password"
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
                  <p data-testid="form-result" className="text-sm text-danger-500">{formState}</p>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
