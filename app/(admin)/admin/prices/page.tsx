import { getPrices } from "@/app/lib/actions";
import PricesTable from "./prices-table";
import { Button, Link } from "@nextui-org/react";


export default async function PriceList(){
  const prices = await getPrices();

  const tableColumns = [
    {
      key: "id",
      label: "ID цены",
    },
    {
      key: "flight_id",
      label: "ID рейса",
    },
    {
      key: "time_left_threshold",
      label: "Время до вылета",
    },
    {
      key: "base_price",
      label: "Цена",
    }
  ];


  return (
    <div>
      <h1>Список цен</h1>
      <PricesTable rows={prices} columns={tableColumns} />
      <Link href="prices/add">
        <Button>Добавить</Button>
      </Link>
    </div>
  )
}