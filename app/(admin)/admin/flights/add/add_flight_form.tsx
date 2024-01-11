"use client";

import { ru } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import {
  Airport,
  Airplane,
  RouteInfo,
  TicketPriceToAdd,
} from "@/app/lib/definitions";
import { insertFlightWithPrice } from "@/app/lib/actions";

function AirplaneAutocomplete({
  airplanes,
  fun,
  label,
  selectedKey,
  name,
}: {
  airplanes: Airplane[];
  fun: any;
  label: string;
  selectedKey: number;
  name: string;
}) {
  return (
    <Autocomplete
      label={label}
      onSelectionChange={fun}
      selectedKey={String(selectedKey)}
      defaultItems={airplanes}
    >
      {(airplane) => (
        <AutocompleteItem key={airplane.id}>
          {`${airplane.model} (${airplane.reg_number})`}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}

function RouteAutocomplete({
  routes,
  fun,
  label,
  selectedKey,
  name,
}: {
  routes: RouteInfo[];
  fun: any;
  label: string;
  selectedKey: number;
  name: string;
}) {
  return (
    <Autocomplete
      label={label}
      onSelectionChange={fun}
      selectedKey={String(selectedKey)}
      defaultItems={routes}
    >
      {(route) => (
        <AutocompleteItem key={route.id}>
          {`${route.departure_airport_name} - ${route.arrival_airport_name}`}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}

export default function AddFlightForm({
  data,
}: {
  data: {
    airplanes: Airplane[];
    routes: RouteInfo[];
  };
}) {
  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [departureTime, setDepartureTime] = useState("");
  const [minimialPrice, setMinimalPrice] = useState<number>(0);
  const [route, setRoute] = useState(0);
  const [airplane, setAirplane] = useState(0);
  const [flightNumber, setFlightNumber] = useState("");
  const [formState, setFormState] = useState("");

  const airplanes = data.airplanes;
  const routes = data.routes;

  async function handleFormSubmission(event: any) {
    event.preventDefault();

    const dateString = departureDate.toISOString().split("T")[0];
    const dateTime = new Date(`${dateString}T${departureTime}:00`);

    const price: TicketPriceToAdd = {
      time_left_threshold: "30 days",
      base_price: minimialPrice * 100, // multiply price by 100 to convert it to rubles
    };

    const res = await insertFlightWithPrice(
      flightNumber,
      dateTime,
      airplane,
      route,
      price,
    );
    setFormState(res);
  }

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

  const timeIsInvalid = useMemo(
    () => validateTime(departureTime),
    [departureTime],
  );

  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={handleFormSubmission}>
        <p className="text-center">Добавить рейс</p>
        <Popover>
          <PopoverTrigger>
            <Button>
              {departureDate ? departureDate?.toDateString() : "Выбрать дату"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <DayPicker
              mode="single"
              selected={departureDate}
              onSelect={(day) => setDepartureDate(day as Date)}
              locale={ru}
            />
          </PopoverContent>
        </Popover>
        <Input
          placeholder="ЧЧ:ММ"
          label="Время вылета"
          value={departureTime}
          isInvalid={timeIsInvalid}
          onValueChange={setDepartureTime}
        />
        <Input
          placeholder=""
          label="Номер рейса"
          value={flightNumber}
          onValueChange={setFlightNumber}
        />
        <AirplaneAutocomplete
          airplanes={airplanes}
          fun={setAirplane}
          label="Самолет"
          selectedKey={airplane}
          name="airplane"
        />
        <RouteAutocomplete
          routes={routes}
          fun={setRoute}
          label="Маршрут"
          selectedKey={route}
          name="route"
        />
        <Input
          label="Минимальная цена"
          value={minimialPrice ? String(minimialPrice) : ""}
          onValueChange={(text) => {
            setMinimalPrice(Number(text));
          }}
        />

        <Button type="submit">Добавить</Button>
        {formState && (
          <>
            <p className="text-sm text-success-500">{formState}</p>
          </>
        )}
      </form>
    </>
  );
}
