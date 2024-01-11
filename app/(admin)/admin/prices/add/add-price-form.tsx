"use client";

import { Input } from "@nextui-org/react";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { addPrice, isIntervalValid } from "@/app/lib/actions";

export default function AddPriceForm() {
  const [flightID, setFlightID] = useState("");
  const [timeLeftThreshold, setTimeLeftThreshold] = useState("");
  const [price, setPrice] = useState("");

  const [formState, setFormState] = useState("");
  const [formError, setFormError] = useState("");

  async function handleFormSubmission(event: any) {
    event.preventDefault();
    setFormError("");
    setFormState("");
    const validInterval = await isIntervalValid(timeLeftThreshold);

    if (!validInterval) {
      setFormError("Неверный формат интервала");
      return;
    }

    if (flightID === "" || timeLeftThreshold === "" || price === "") {
      setFormError("Заполните все поля");
      return;
    }
    const priceInKopecks = Number(price) * 100;

    const res = await addPrice(
      Number(flightID),
      priceInKopecks,
      timeLeftThreshold,
    );
    if (res === "Успешно добавлено") {
      setFormState(res);
    }
    if (res === "Произошла ошибка") {
      setFormError(res);
    }
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleFormSubmission}>
      <Input
        placeholder=""
        label="ID рейса"
        value={flightID}
        onValueChange={setFlightID}
      />
      <Input
        placeholder="7 days"
        label="Время до вылета"
        value={timeLeftThreshold}
        onValueChange={setTimeLeftThreshold}
      />
      <Input
        placeholder=""
        label="Цена"
        value={price}
        onValueChange={setPrice}
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
