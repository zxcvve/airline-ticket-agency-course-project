import { getAirplaneInfo, getAirplanes, getAirportInfo } from "@/app/lib/actions";
import { Airplane, Airport } from "@/app/lib/definitions";
import EditAirportForm from "./edit_form";

export default async function EditAirplane({
  params,
}: {
  params: { airport_id: number };
}) {
  const airport_info: Airport = await getAirportInfo(params.airport_id);

  return <EditAirportForm props={airport_info} />;
}
