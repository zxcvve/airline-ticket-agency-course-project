"use server";

import { NewOrderForm } from "@/app/components/new-order-form";
import { getFlightInfo } from "@/app/lib/actions";

export default async function NewOrderPage({
  params,
}: {
  params: { flight_id: number };
}) {
  const flight = await getFlightInfo(params.flight_id);

  return <NewOrderForm key={flight.flight_id} {...flight} />;
}
