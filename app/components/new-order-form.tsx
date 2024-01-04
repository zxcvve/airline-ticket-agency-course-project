"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { FlightInfo } from "../lib/definitions";
import { Input } from "@nextui-org/input";
import { newOrder, registerUser } from "../lib/actions";

import { SessionData, defaultSession, sessionOptions } from "@/app/lib/session";
import { useEffect, useState } from "react";

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
    return <Form {...flight} {...session} />;
  }
}

function Form(flight: FlightInfo, session: SessionData) {
  const userId = session.userId;

  const flight_departure_date = flight.departure_time.toLocaleDateString();
  const flight_arrival_date = flight.arrival_time.toLocaleDateString();
  const flight_departure_time = flight.departure_time.toLocaleTimeString();
  const flight_arrival_time = flight.arrival_time.toLocaleTimeString();

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
        <Input placeholder="ФИО" />
        <Button onClick={() => console.log(session.userId)}>
          Купить {flight.current_price}
        </Button>
      </CardFooter>
    </Card>
  );
}
