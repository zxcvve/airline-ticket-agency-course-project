import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Airport } from "../lib/definitions";

export default function AirportAutocomplete({
  airports,
  fun,
  label,
  selectedKey,
  name,
}: {
  airports: Airport[];
  fun: any;
  label: string;
  selectedKey: number;
  name: string;
}) {
  return (
    <Autocomplete
      label={label}
      onSelectionChange={fun}
      selectedKey={String(selectedKey)}
      defaultItems={airports}
    >
      {(airport) => (
        <AutocompleteItem key={airport.id}>{airport.title}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}
