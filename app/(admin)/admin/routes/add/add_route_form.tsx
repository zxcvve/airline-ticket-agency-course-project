"use client";

import { Airport } from "@/app/lib/definitions";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";

import AirportAutocomplete from "@/app/components/airport-autocomplete";
import { useMemo, useState } from "react";
import { insertRoute } from "@/app/lib/actions";

export default function AddRouteForm({ airports }: { airports: Airport[] }) {
  const [departureAirport, setDepartureAirport] = useState(0);
  const [arrivalAirport, setArrivalAirport] = useState(0);
  const [flightTime, setFlightTime] = useState("00:00");
  const [formState, setFormState] = useState("");
  const [formError, setFormError] = useState("");

  function validateTime(time: string) {
    const hours: number = Number(time.split(":")[0]);
    const minutes: number = Number(time.split(":")[1]);

    if (hours < 0 || hours > 23) {
      return true;
    }
    if (minutes < 0 || minutes > 59) {
      return true;
    }
  }

  const timeIsInvalid = useMemo(() => validateTime(flightTime), [flightTime]);

  async function handleFormSubmission(event: any) {
    event.preventDefault();
    setFormError("");
    setFormState("");

    console.log(departureAirport, arrivalAirport, flightTime);
    if (departureAirport === arrivalAirport) {
      setFormError("Аэропорты должны быть разными");
      return;
    }

    if (timeIsInvalid) {
      setFormError("Неверный формат времени");
      return;
    }
    const flightTimeInterval = `${flightTime}:00 hours`;

    const res = await insertRoute(departureAirport, arrivalAirport, flightTimeInterval);
    setFormState(res);
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleFormSubmission}>
      <p className="text-center">Добавить рейс</p>
      <AirportAutocomplete
        airports={airports}
        fun={setDepartureAirport}
        label="Аэропорт отправления"
        selectedKey={departureAirport}
        name=""
      ></AirportAutocomplete>
      <AirportAutocomplete
        airports={airports}
        fun={setArrivalAirport}
        label="Аэропорт отправления"
        selectedKey={arrivalAirport}
        name=""
      ></AirportAutocomplete>
      <Input
        placeholder="ЧЧ:ММ"
        label="Время в пути"
        value={flightTime}
        isInvalid={timeIsInvalid}
        onValueChange={setFlightTime}
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
