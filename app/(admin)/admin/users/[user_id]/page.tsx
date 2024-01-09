import { getAirplaneInfo, getAirplanes, getAirportInfo, getUserInfo } from "@/app/lib/actions";
import { Airplane, Airport, UserWithoutPassword } from "@/app/lib/definitions";
import EditUserForm from "./edit_form";

export default async function EditAirplane({
  params,
}: {
  params: { user_id: number };
}) {
  const user_info: UserWithoutPassword = await getUserInfo(params.user_id);

  return <EditUserForm props={user_info} />;
}
