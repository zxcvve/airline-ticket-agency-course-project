"use client";

import React from "react";
import { Route, Airport } from "@/app/lib/definitions";
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@nextui-org/autocomplete";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { updateRouteInfo } from "@/app/lib/actions";
import AirportAutocomplete from "@/app/components/airport-autocomplete";

export default function EditRouteForm({
  route,
  airports,
}: {
  route: Route;
  airports: Airport[];
}) {
  const [departureAirport, setDepartureAirport] = useState(
    route.departure_airport,
  );
  const [arrivalAirport, setArrivalAirport] = useState(route.arrival_airport);
  const [flightDuration, setFlightDuration] = useState(route.flight_duration);
  const [formState, setFormState] = useState<string>("");

  async function handleFormSubmission(event: any) {
    event.preventDefault();

    const res = await updateRouteInfo(
      route.id,
      departureAirport,
      arrivalAirport,
      flightDuration,
    );
    setFormState(res);
  }
  return (
    <form className="flex flex-col gap-2" onSubmit={handleFormSubmission}>
      <Input name="id" isDisabled={true} label="ID" value={String(route.id)} />
      <AirportAutocomplete
        name="departure_airport"
        airports={airports}
        fun={setDepartureAirport}
        label="Аэропорт отправления"
        selectedKey={departureAirport}
      />
      <AirportAutocomplete
        name="arrival_airport"
        airports={airports}
        fun={setArrivalAirport}
        label="Аэропорт прибытия"
        selectedKey={arrivalAirport}
      />
      <Input
        name="flight_duration "
        label="Время в пути"
        value={flightDuration}
        onValueChange={setFlightDuration}
      />
      <Button type="submit">Сохранить</Button>
      {formState && (
        <>
          <p className="text-sm text-green-500">{formState}</p>
        </>
      )}
    </form>
  );
}
