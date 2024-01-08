import { getAirplaneInfo, getAirplanes } from "@/app/lib/actions";
import { airplane } from "@/app/lib/definitions";
import EditAirplaneForm from "./edit_form";

export default async function EditAirplane({
  params,
}: {
  params: { airplane_id: number };
}) {
  const airplane_info: airplane = await getAirplaneInfo(params.airplane_id);

  return <EditAirplaneForm props={airplane_info} />;
}
