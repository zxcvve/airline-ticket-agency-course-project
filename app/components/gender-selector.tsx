"use client";

import { Select, SelectItem } from "@nextui-org/select";

const genderList: string[] = ["Мужской", "Женский"];

export default function GenderSelector() {
  return (
    <div className="p-2">
      <Select label="Пол">
        {genderList.map((gender) => (
          <SelectItem key={gender}>{gender}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
