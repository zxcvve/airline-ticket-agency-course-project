import { getAirports, getRoute } from "@/app/lib/actions";
import { Route } from "@/app/lib/definitions";
import EditRouteForm from "./edit_form";

export default async function EditAirplane({
  params,
}: {
  params: { route_id: number };
}) {
  const route_info: Route = await getRoute(params.route_id);
  const airports = await getAirports();

  return <EditRouteForm route={route_info} airports={airports} />;
}
