import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

interface FlightSearchItemProps {
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
}

export default function FlightSearchItem({
  FlightSearchItem,
}: {
  FlightSearchItem: FlightSearchItemProps;
}) {
  return (
    <Card>
      <CardHeader>
        <p>Flight Number: {FlightSearchItem.flightNumber}</p>
      </CardHeader>
      <CardBody>
        <p>Origin: {FlightSearchItem.origin}</p>
        <p>Destination: {FlightSearchItem.destination}</p>
        <p>Departure Time: {FlightSearchItem.departureTime}</p>
        <p>Arrival Time: {FlightSearchItem.arrivalTime}</p>
      </CardBody>
    </Card>
  );
}
