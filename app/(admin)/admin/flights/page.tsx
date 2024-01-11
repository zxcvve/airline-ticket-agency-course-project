import { getFlightInfoList } from "@/app/lib/actions";
import FlightsTable from "./flights-table";
import { FlightInfo } from "@/app/lib/definitions";
import { Button, Link } from "@nextui-org/react";

type FlightInfoWithDatesOmitted = Omit<
  FlightInfo,
  "departure_time" | "arrival_time"
>;

export interface ProcessedFlightInfo extends FlightInfoWithDatesOmitted {
  departure_time: string;
  arrival_time: string;
}

export default async function FlightList() {
  const flights =
    (await getFlightInfoList()) as unknown as ProcessedFlightInfo[];
  flights.map((flight: ProcessedFlightInfo) => {
    flight.arrival_time = new Date(flight.arrival_time).toLocaleString();
    flight.departure_time = new Date(flight.departure_time).toLocaleString();
    flight.current_price = flight.current_price / 100;
  });

  const tableColumns = [
    {
      key: "flight_id",
      label: "ID",
    },
    {
      key: "flight_number",
      label: "Номер рейса",
    },
    {
      key: "departure_time",
      label: "Время вылета",
    },
    {
      key: "arrival_time",
      label: "Время прилета",
    },
    {
      key: "flight_duration",
      label: "Длительность полета",
    },
    {
      key: "airplane_model",
      label: "Модель самолета",
    },
    {
      key: "airplane_reg_number",
      label: "Регистрационный номер самолета",
    },
    {
      key: "departure_airport",
      label: "Аэропорт вылета",
    },
    {
      key: "arrival_airport",
      label: "Аэропорт прилета",
    },

    {
      key: "current_price",
      label: "Цена",
    },
    {
      key: "isenabled",
      label: "Включен",
    },
    {
      key: "actions",
      label: "Действия",
    },
  ];

  return (
    <div>
      <h1>Список рейсов</h1>
      <FlightsTable flights={flights} columns={tableColumns} />
      <Link href="flights/add">
        <Button>Добавить</Button>
      </Link>
    </div>
  );
}
