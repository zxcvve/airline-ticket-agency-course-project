"use client";

import { airport } from "@/app/lib/definitions";
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

export default function AirportsTable(data: any) {
  const columns: {
    key: string;
    label: string;
  }[] = data.columns;
  const rows: airport[] = data.airports;
  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                <Link href={`airports/${item.id}`}>
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