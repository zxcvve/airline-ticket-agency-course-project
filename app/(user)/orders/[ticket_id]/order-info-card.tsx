"use client";

import { TicketInfo } from "@/app/lib/definitions";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import ReactDOMServer from "react-dom/server";

export default function OrderInfoCard({ ticket }: { ticket: TicketInfo }) {
  return (
    <Card>
      <CardHeader>
        Билет №{ticket.ticket_id}
        <br />
        {ticket.departure_airport} - {ticket.arrival_airport}
      </CardHeader>
      <Divider />
      <CardBody>
        <div>
          <p>
            Пассажир: {ticket.last_name} {ticket.first_name}{" "}
            {ticket.middle_name}
          </p>
          <p>Рейс: {ticket.flight_number}</p>
          <p>Самолёт: {ticket.airplane_model}</p>
          <p>Место: {ticket.seat_number}</p>
          <p>
            Отправление: {ticket.departure_city}
            {", "}
            {ticket.departure_time.toLocaleString("ru-RU")}
          </p>
          <p>
            Прибытие: {ticket.arrival_city}
            {", "}
            {ticket.arrival_time.toLocaleString("ru-RU")}
          </p>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="gap-2 flex flex-col">
          Цена: {ticket.ticket_price} ₽
          <div>
            <Button onClick={() => print()}>Печать</Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
