"use client";

import { FlightInfo } from "@/app/lib/definitions";
import { getKeyValue } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import Link from "next/link";
import { ProcessedFlightInfo } from "./page";



export default function FlightsTable(data: any) {
  const columns: {
    key: string;
    label: string;
  }[] = data.columns;
  const rows: ProcessedFlightInfo[] = data.flights;

  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.flight_id}>
            {(columnKey) => (
              <TableCell>
                <Link href={`flights/${item.flight_id}`}>
                  {getKeyValue(item, columnKey)}
                </Link>
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
