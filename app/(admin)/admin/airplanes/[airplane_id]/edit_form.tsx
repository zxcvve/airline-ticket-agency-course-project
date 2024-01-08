"use client";

import { updateAirplaneInfo } from "@/app/lib/actions";
import { airplane } from "@/app/lib/definitions";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";



export default function EditAirplaneForm({ props }: { props: airplane }) {
  const [model, setModel] = useState(props.model);
  const [reg_number, setReg_number] = useState(props.reg_number);
  const [seats, setSeats] = useState(props.seats);
  const [formState, setFormState] = useState<string>("");

  async function handleFormSubmission(event: any) {
    event.preventDefault();
    const model = event.target.model.value;
    const reg_number = event.target.reg_number.value;
    const id = event.target.id.value;
  
    const res = await updateAirplaneInfo(id, model, reg_number);
    setFormState(res);
  }





  return (
    <form className="flex flex-col gap-2" onSubmit={handleFormSubmission}>
      <Input name="id"isDisabled={true} label="ID" value={String(props.id)}/>
      <Input name="model" label="Модель" value={model} onValueChange={setModel}/>
      <Input name="reg_number" label="Рег. номер" value={reg_number} onValueChange={setReg_number}/>
      <Input isDisabled={true} label="Места" value={String(seats)} />
      <Button type="submit">Сохранить</Button>
      {formState && (
            <>
              <p className="text-sm text-green-500">{formState}</p>
            </>
          )}
    </form>
  );
}
