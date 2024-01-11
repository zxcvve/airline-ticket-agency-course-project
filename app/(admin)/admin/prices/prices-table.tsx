"use client";

import { Price } from "@/app/lib/definitions";
import { Button, Chip, Link, getKeyValue } from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
export default function PricesTable({
  rows,
  columns,
}: {
  rows: Price[];
  columns: {
    key: string;
    label: string;
  }[];
}) {
  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.flight_id}>
            {(columnKey) => (
              <TableCell> {getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
