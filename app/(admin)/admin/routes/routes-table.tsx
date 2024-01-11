"use client";

import { toggleRoute } from "@/app/lib/actions";
import { RouteInfo } from "@/app/lib/definitions";
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

export default function RoutesTable(data: any) {
  const columns: {
    key: string;
    label: string;
  }[] = data.columns;
  const rows: RouteInfo[] = data.routes;

  function renderCell(item: RouteInfo, columnKey: any) {
    return (
      <div>
        <Link href={`routes/${item.id}`}>
          {getKeyValue(item, columnKey)}
        </Link>
        {columnKey === "isenabled" && <p>{item.isenabled ? "✔️" : "❌"}</p>}
        {columnKey === "actions" && (
          <Button
            size="sm"
            onPress={() => toggleRoute(item.id, item.isenabled)}
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
