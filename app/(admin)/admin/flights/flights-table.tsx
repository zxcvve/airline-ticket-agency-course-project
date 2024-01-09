"use client";

import { Button, getKeyValue } from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import Link from "next/link";
import { ProcessedFlightInfo } from "./page";

export default function FlightsTable(data: any) {
  const columns: {
    key: string;
    label: string;
  }[] = data.columns;
  const rows: ProcessedFlightInfo[] = data.flights;

  function renderCell(item: any, columnKey: any) {
    return (
      <Link href={`flights/${item.flight_id}`}>
        {getKeyValue(item, columnKey)}
        {/* TODO: Реализовать удаление полёта */}
        {columnKey === "actions" && <Button size="sm">Удалить</Button>}
      </Link>
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
