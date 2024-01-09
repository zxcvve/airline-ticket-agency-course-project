import { FlightInfo } from "../lib/definitions";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";

export default function FlightItem(flight: FlightInfo) {
  const flight_departure_date = flight.departure_time.toLocaleDateString();
  const flight_arrival_date = flight.arrival_time.toLocaleDateString();

  const flight_departure_time = flight.departure_time.toLocaleTimeString();
  const flight_arrival_time = flight.arrival_time.toLocaleTimeString();

  return (
    <Card className="" isHoverable={true}>
      <CardBody className="grid grid-cols-4 gap-6 items-center justify-center">
        <p>{flight.airplane_model}</p>
        <p>
          {flight.departure_airport} <br />
          {flight_departure_date} {flight_departure_time}
        </p>
        <p>
          {flight.arrival_airport} <br />
          {flight_arrival_date} {flight_arrival_time}
        </p>
        <Link href={`/new-order/${flight.flight_id}`}>
          <Button>Купить {flight.current_price}</Button>
        </Link>
      </CardBody>
      {/* <CardFooter className="justify-center">
        <Link href={`/new-order/${flight.flight_id}`}>
          <Button>Купить {flight.current_price}</Button>
        </Link>
      </CardFooter> */}
    </Card>
  );
}
