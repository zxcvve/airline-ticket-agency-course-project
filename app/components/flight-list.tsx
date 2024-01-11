"use server";

import { getAvailableFlightsInfoList, getFlightInfoList } from "../lib/actions";
import { FlightInfo } from "../lib/definitions";
import FlightItem from "./flight";

export default async function FlightList() {
  const flights = await getAvailableFlightsInfoList();

  return (
    <div>
      {flights.map((flight: FlightInfo) => {
        return <FlightItem key={flight.flight_id} {...flight} />;
      })}
    </div>
  );
}
