import { getAirports } from "@/app/lib/actions";
import AirportsTable from "./airports-table";

export default async function AirportList() {
  const airports = await getAirports();

  const tableColumns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "title",
      label: "Название",
    },
    {
      key: "city",
      label: "Город",
    },
    {
      key: "country",
      label: "Страна",
    },
    {
      key: "address",
      label: "Адрес",
    },
    {
      key: "coordinates",
      label: "Координаты",
    }
  ];


  return (
    <div>
      <h1>Список аэропортов</h1>
      <AirportsTable airports={airports} columns={tableColumns} />
    </div>
  );
}
