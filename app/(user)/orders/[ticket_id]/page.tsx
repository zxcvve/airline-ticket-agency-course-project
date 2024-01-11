import { getTicketInfo } from "@/app/lib/actions";
import OrderInfoCard from "./order-info-card";
import { TicketInfo } from "@/app/lib/definitions";

export default async function OrderInfoPage({
  params,
}: {
  params: { ticket_id: number };
}) {
  const ticket: TicketInfo = await getTicketInfo(params.ticket_id);
  ticket.ticket_price = ticket.ticket_price / 100; // convert to rubles
  return <OrderInfoCard ticket={ticket} />;
}
