import { flight } from "../lib/definitions";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";


export default function FlightItem(flight: flight){


  return (
    // <div>
    //   <h3>{flight.id}</h3>
    //   <p>{flight.departure_time.toString()}</p>
    //   <p>{flight.arrival_time.toString()}</p>
    // </div>
    <Card>
      <CardHeader>{flight.id}</CardHeader>
      <CardBody>
        <p>{flight.departure_time.toString()}</p>
        <p>{flight.arrival_time.toString()}</p>
      </CardBody>
      <CardFooter>Footer</CardFooter>
    </Card>
  )
}