import { getAirplanes, getAirports, getRoutes } from "@/app/lib/actions";
import AddRouteForm from "./add_route_form";
import { Airplane, Airport, RouteInfo } from "@/app/lib/definitions";

export default async function AddFlightPage() {
  const airports: Airport[] = await getAirports();

  return (
    <>
      <AddRouteForm airports={airports} />
    </>
  );
}
