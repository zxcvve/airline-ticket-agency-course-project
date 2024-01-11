"use client";

import { toggleAirplane } from "@/app/lib/actions";
import { Airplane } from "@/app/lib/definitions";
import { Button, getKeyValue } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import Link from "next/link";

export default function AirplanesTable(data: any) {
  const columns: {
    key: string;
    label: string;
  }[] = data.columns;
  const rows: Airplane[] = data.airplanes;

  function renderCell(item: Airplane, columnKey: any) {
    return (
      <div>
        <Link href={`airplanes/${item.id}`}>
          {getKeyValue(item, columnKey)}
        </Link>
        {columnKey === "isenabled" && <p>{item.isenabled ? "✔️" : "❌"}</p>}
        {columnKey === "actions" && (
          <Button
            size="sm"
            onPress={() => toggleAirplane(item.id, item.isenabled)}
          >
            Вкл / Выкл
          </Button>
        )}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
