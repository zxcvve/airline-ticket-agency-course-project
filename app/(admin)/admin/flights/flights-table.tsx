"use client";

import { Button, Chip, Link, getKeyValue } from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { ProcessedFlightInfo } from "./page";
import {  toggleFlight } from "@/app/lib/actions";

export default function FlightsTable(data: any) {
  const columns: {
    key: string;
    label: string;
  }[] = data.columns;
  const rows: ProcessedFlightInfo[] = data.flights;

  function renderCell(item: any, columnKey: any) {
    return (
      <div>
        {getKeyValue(item, columnKey)}
        {columnKey === "isenabled" && (
          <p>{item.isEnabled ? "✔️" : "❌"}</p>
        )}
        {columnKey === "actions" && (
          <Button size="sm" onPress={() => toggleFlight(item.flight_id, item.isEnabled)}>
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
          <TableRow key={item.flight_id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
