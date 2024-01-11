import { getAirplanes } from "@/app/lib/actions";
import { Airplane } from "@/app/lib/definitions";
import { Spacer } from "@nextui-org/spacer";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import AirplanesTable from "./airplanes-table";

export default async function AirplaneList() {
  const airplanes = await getAirplanes();
  const tableColumns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "model",
      label: "Модель",
    },
    {
      key: "reg_number",
      label: "Рег. номер",
    },
    {
      key: "seats",
      label: "Мест",
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
      <h1>Список самолетов</h1>
      <AirplanesTable airplanes={airplanes} columns={tableColumns} />
    </div>
  );
}
