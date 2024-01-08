import { getAirplanes } from "@/app/lib/actions";
import { airplane } from "@/app/lib/definitions";
import { Spacer } from "@nextui-org/spacer";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import AirplaneTable from "./airplanes-table";

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
  ];

  return (
    <div>
      <h1>Список самолетов</h1>
      <AirplaneTable airplanes={airplanes} columns={tableColumns} />
    </div>
  );
}
