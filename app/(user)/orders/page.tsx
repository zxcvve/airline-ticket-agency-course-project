"use server";

import { getUserOrders } from "@/app/lib/actions";
import { TicketInfo } from "@/app/lib/definitions";
import { SessionData, sessionOptions } from "@/app/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { redirect } from "next/navigation";
import  Link  from "next/link";

async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return session;
}

function Order(order: TicketInfo) {
  const flight_departure_date = new Date(
    order.departure_time,
  ).toLocaleDateString();
  const flight_departure_time = new Date(
    order.departure_time,
  ).toLocaleTimeString();

  const flight_arrival_date = new Date(order.arrival_time).toLocaleDateString();
  const flight_arrival_time = new Date(order.arrival_time).toLocaleTimeString();

  return (
    <Link href={`orders/${order.ticket_id}`}>
      <Card className="m-2" isHoverable={true}>
        <CardBody className="flex flex-row ">
          <p>
            Рейс #{order.flight_number} <br />
            {order.airplane_model}
          </p>
          <Divider orientation="vertical" className="px-4" />
          <p>
            {order.departure_airport} <br />
            {flight_departure_date} {flight_departure_time}
          </p>
          <Divider orientation="vertical" className="px-4" />
          <p>
            {order.arrival_airport} <br />
            {flight_arrival_date} {flight_arrival_time}
          </p>
        </CardBody>
      </Card>
    </Link>
  );
}

export default async function Orders() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/login");
  }

  const userId = session.userId;

  const orders = await getUserOrders(userId);

  return (
    <div>
      {orders.map((order) => (
        <Order key={order.ticket_id} {...order} />
      ))}
    </div>
  );
}
