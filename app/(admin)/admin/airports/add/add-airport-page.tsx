"use client";

import { addAirport } from "@/app/lib/actions";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

export default function AddAirportForm() {
  const [airportTitle, setAirportTitle] = useState("");
  const [airportCity, setAirportCity] = useState("");
  const [airportCountry, setAirportCountry] = useState("");
  const [airportAddress, setAirportAddress] = useState("");
  const [coordinates, setCoordinates] = useState("");

  const [formState, setFormState] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  async function handleFormSubmission(event: any) {
    event.preventDefault();
    setFormError("");
    setFormState("");
    if (
      airportTitle === "" ||
      airportCity === "" ||
      airportCountry === "" ||
      airportAddress === "" ||
      coordinates === ""
    ) {
      setFormError("Заполните все поля");
      return;
    }

    const res = await addAirport(airportTitle, airportCity, airportCountry, airportAddress, coordinates);
    setFormState(res);
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleFormSubmission}>
      <Input
        name="airportTitle"
        value={airportTitle}
        onValueChange={setAirportTitle}
        label="Название аэропорта"
      ></Input>
      <Input
        name="airportCity"
        value={airportCity}
        onValueChange={setAirportCity}
        label="Город"
      ></Input>
      <Input
        name="airportCountry"
        value={airportCountry}
        onValueChange={setAirportCountry}
        label="Страна"
      ></Input>
      <Input
        name="airportAddress"
        value={airportAddress}
        onValueChange={setAirportAddress}
        label="Адрес"
      ></Input>
      <Input
        name="coordinates"
        value={coordinates}
        onValueChange={setCoordinates}
        label="Координаты"
        placeholder="(55.011494,82.651936)"
      ></Input>
      <Button type="submit">Добавить</Button>
      {formState && (
        <>
          <p className="text-sm text-green-500">{formState}</p>
        </>
      )}
      {formError && (
        <>
          <p className="text-sm text-red-500">{formError}</p>
        </>
      )}
    </form>
  );
}
