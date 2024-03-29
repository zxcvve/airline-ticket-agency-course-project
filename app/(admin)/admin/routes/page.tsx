import { getRoutes } from "@/app/lib/actions";
import RoutesTable from "./routes-table";
import { Button, Link } from "@nextui-org/react";

export default async function RouteList() {
  const routes = await getRoutes();

  const tableColumns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "departure_airport_name",
      label: "Откуда",
    },
    {
      key: "arrival_airport_name",
      label: "Куда",
    },
    {
      key: "flight_duration",
      label: "Время в пути",
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
      <h1>Список маршрутов</h1>
      <RoutesTable columns={tableColumns} routes={routes} />
      <Link href="routes/add">
        <Button>Добавить</Button>
      </Link>
    </div>
  );
}
