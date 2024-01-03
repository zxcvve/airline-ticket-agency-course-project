"use client";
import { flight } from "../lib/definitions";
import { useEffect, useState } from "react";
import FlightSearch from "../components/flight-search-bar";
import { getFlightList } from "../lib/actions";

import { Button } from "@nextui-org/button";
import FlightList from "../components/flight-list";



export default function Home() {
  const [flights, setFlights] = useState<flight[]>([]);

  useEffect(() => {
    async function getFlights() {
      const flights = await getFlightList();
      setFlights(flights);
    }
    getFlights();
  }, []);


  return (
    <>
      <FlightSearch />
      <FlightList flights={flights as flight[]} />
    </>
  );
}
