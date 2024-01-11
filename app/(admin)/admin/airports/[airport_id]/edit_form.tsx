"use client";

import { updateAirportInfo } from "@/app/lib/actions";
import { Airport } from "@/app/lib/definitions";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";

export default function EditAirportForm({ props }: { props: Airport }) {
  const [title, setTitle] = useState(props.title);
  const [city, setCity] = useState(props.city);
  const [country, setCountry] = useState(props.country);
  const [address, setAddress] = useState(props.address);
  const [coordinates, setCoordinates] = useState(props.coordinates);

  const [formState, setFormState] = useState<string>("");

  async function handleFormSubmission(event: any) {
    event.preventDefault();
    const title = event.target.title.value;
    const city = event.target.city.value;
    const country = event.target.country.value;
    const address = event.target.address.value;
    const coordinates = event.target.coordinates.value;
    const id = props.id;


    const res = await updateAirportInfo(id, title, city, country, address, coordinates);
    setFormState(res);
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleFormSubmission}>
      <Input name="id" isDisabled={true} label="ID" value={String(props.id)} />
      <Input
        name="title"
        label="Название"
        value={title}
        onValueChange={setTitle}
      />
      <Input name="city" label="Город" value={city} onValueChange={setCity} />
      <Input
        name="country"
        label="Страна"
        value={country}
        onValueChange={setCountry}
      />
      <Input
        name="address"
        label="Адрес"
        value={address}
        onValueChange={setAddress}
      />
      <Input
        name="coordinates"
        label="Координаты"
        value={coordinates}
        onValueChange={setCoordinates}
      />
      

      {/* <Input name="reg_number" label="Рег. номер" value={reg_number} onValueChange={setReg_number}/> */}

      <Button type="submit">Сохранить</Button>
      {formState && (
        <>
          <p className="text-sm text-success-500">{formState}</p>
        </>
      )}
    </form>
  );
}
