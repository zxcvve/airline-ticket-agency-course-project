"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState, useEffect, FormEvent } from "react";
import { Select, SelectItem } from "@nextui-org/select";

export default function FlightSearchBar() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const airports = ["Airport 1", "Airport 2", "Airport 3", "Airport 4"]; // replace with your actual data

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(`Searching for flights from ${from} to ${to}`);
  };

  useEffect(() => {
    // You can add your flight search logic here
  }, [from, to]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <p className="text-center">Поиск</p>
        <div className="flex flex-row justify-center items-center space-x-5 m-10 max-w-xl mx-auto">
          <Select>
            {airports.map((airport) => (
              <SelectItem key={airport} value={airport}>
                {airport}
              </SelectItem>
            ))}
          </Select>

          <Select>
            {airports.map((airport) => (
              <SelectItem key={airport} value={airport}>
                {airport}
              </SelectItem>
            ))}
          </Select>

          <Button type="submit">Найти</Button>
        </div>
      </div>
    </form>
  );
}
