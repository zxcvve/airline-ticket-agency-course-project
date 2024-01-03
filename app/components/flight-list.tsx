import { flight } from "../lib/definitions";
import FlightItem from './flight'

export default function FlightList({ flights }: { flights: flight[] }) {
  return (
    <div>
      {flights.map((flight: flight) => {
        return <FlightItem key={flight.id} {...flight} />
      })}
    </div>

  )
}