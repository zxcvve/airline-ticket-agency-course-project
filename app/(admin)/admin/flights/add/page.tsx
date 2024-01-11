import { getAirplanes, getAirports, getEnabledAirplanes, getRoutes } from "@/app/lib/actions";
import AddFlightForm from "./add_flight_form";
import { Airplane, Airport, RouteInfo } from "@/app/lib/definitions";

export default async function AddFlightPage() {
  const airplanes: Airplane[] = await getEnabledAirplanes();
  const routes: RouteInfo[] = await getRoutes();
  const data = {
    airplanes,
    routes,
  };

  return (
    <>
      <AddFlightForm data={data} />
    </>
  );
}
