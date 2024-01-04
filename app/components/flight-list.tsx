"use server";

import { getFlightList } from "../lib/actions";
import { flight } from "../lib/definitions";
import FlightItem from "./flight";

export default async function FlightList() {
  const flights = await getFlightList();

  return (
    <div>
      {flights.map((flight: flight) => {
        return <FlightItem key={flight.id} {...flight} />;
      })}
    </div>
  );
}
