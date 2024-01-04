import { Link } from "@nextui-org/link";

export default function AdminPage() {
  return (
    <>
      <ul className="flex flex-col">
        <Link href="admin/users">Пользователи</Link>
        <Link href="admin/routes">Маршруты</Link>
        <Link href="admin/flights">Полёты</Link>
        <Link href="admin/airports">Аэропорты</Link>
        <Link href="admin/airplanes">Самолёты</Link>
        <Link href="admin/tickets">Билеты</Link>
        <Link href="admin/prices">Цены</Link>
        <Link href="admin/seats">Места</Link>
      </ul>
    </>
  );
}
