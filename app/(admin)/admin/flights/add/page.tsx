import {
  getEnabledAirplanes,
  getEnabledRoutes
} from "@/app/lib/actions";
import { Airplane, RouteInfo } from "@/app/lib/definitions";
import AddFlightForm from "./add_flight_form";

export default async function AddFlightPage() {
  const airplanes: Airplane[] = await getEnabledAirplanes();
  const routes: RouteInfo[] = await getEnabledRoutes();
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
