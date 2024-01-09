"use client";

import { Airport, UserWithoutPassword } from "@/app/lib/definitions";
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

interface processedUser extends UserWithoutPassword {
  gender: string;
}

export default function UsersTable(data: any) {
  const columns: {
    key: string;
    label: string;
  }[] = data.columns;

  const rows: processedUser[] = data.users;

  rows.map((row) => {
    if (row.ismale) {
      row.gender = "Мужской";
    } else {
      row.gender = "Женский";
    }
  });
  
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
                <Link href={`users/${item.id}`}>
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
