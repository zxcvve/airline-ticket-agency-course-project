"use client";

import { addAirplane } from "@/app/lib/actions";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";

export default function AddAirplaneForm() {
  const [model, setModel] = useState("");
  const [reg_number, setReg_number] = useState("");
  const [seats, setSeats] = useState<number>(0);
  const [formState, setFormState] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  async function handleFormSubmission(event: any) {
    event.preventDefault();
    setFormError("");
    setFormState("");
    if (model === "" || reg_number === "" || seats === 0) {
      setFormError("Заполните все поля");
      return;
    }

    const res = await addAirplane(model, reg_number, seats);
    setFormState(res);
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleFormSubmission}>
      <Input
        name="model"
        label="Модель"
        value={model}
        onValueChange={setModel}
      />
      <Input
        name="reg_number"
        label="Рег. номер"
        value={reg_number}
        onValueChange={setReg_number}
      />
      <Input
        label="Места"
        value={String(seats)}
        onValueChange={(key) => setSeats(Number(key))}
      />
      <Button type="submit">Добавить</Button>
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
