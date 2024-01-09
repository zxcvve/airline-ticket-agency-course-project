"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { FlightInfo, Seat } from "../lib/definitions";
import { Input } from "@nextui-org/input";
import { redirectToLogin } from "@/app/(user)/lib/actions";
import { Autocomplete, AutocompleteItem, Select, SelectItem } from "@nextui-org/react";

import { SessionData, defaultSession } from "@/app/lib/session";
import { use, useEffect, useState } from "react";
import { getFreeSeats, newOrder } from "../lib/actions";

function SeatSelect({ flight_id, seat, onSeatSelect }: any) {
  const [seats, setSeats] = useState<Seat[]>([]);

  useEffect(() => {
    getFreeSeats(flight_id, 50).then((seats) => {
      setSeats(seats);
    });
  }, [flight_id]);

  return (
    <Autocomplete
      label="Место"
      isRequired
      selectedKey={seat}
      defaultItems={seats}
      onSelectionChange={onSeatSelect}
      value={seat}
    >
      {(seat) => (
        <AutocompleteItem
          key={seat.seat_id}
          value={seat.seat_id}
          textValue={String(seat.seat_number)}
        >
          {seat.seat_number}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}

export function NewOrderForm(flight: FlightInfo) {
  const [session, setSession] = useState<SessionData>(defaultSession);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((session) => {
        setSession(session);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (session.isLoggedIn) {
    const props = {
      flight,
      session,
    };
    return <Form {...props} />;
  }

  redirectToLogin();
}

function Form(props: any) {
  const flight: FlightInfo = props.flight;
  const session: SessionData = props.session;

  const flight_departure_date = flight.departure_time.toLocaleDateString();
  const flight_arrival_date = flight.arrival_time.toLocaleDateString();
  const flight_departure_time = flight.departure_time.toLocaleTimeString();
  const flight_arrival_time = flight.arrival_time.toLocaleTimeString();

  const price_rub: number = flight.current_price / 100;

  const [selectedSeat, setSelectedSeat] = useState<any>();

  // const seatNumber = selectedSeat?.target.value;

  return (
    <Card className="" isHoverable={true}>
      <CardBody className="flex flex-row ">
        <p>{flight.airplane_model}</p>
        <Divider orientation="vertical" className="px-4" />
        <p>
          {flight.departure_airport} <br />
          {flight_departure_date} {flight_departure_time}
        </p>
        <Divider orientation="vertical" className="px-4" />
        <p>
          {flight.arrival_airport} <br />
          {flight_arrival_date} {flight_arrival_time}
        </p>
      </CardBody>
      <CardFooter className="justify-center">
        <SeatSelect
          flight_id={flight.flight_id}
          seat={selectedSeat}
          onSeatSelect={setSelectedSeat}
        />
        <Button
          onClick={() => {
            if (selectedSeat) {
              const res = newOrder(
                session.userId,
                flight.flight_id,
                flight.current_price,
                selectedSeat,
              );
            }
          }}
        >
          Купить {price_rub}₽
        </Button>
      </CardFooter>
    </Card>
  );
}
