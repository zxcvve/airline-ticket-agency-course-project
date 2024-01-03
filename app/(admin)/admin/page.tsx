import { Link } from "@nextui-org/link";


export default function AdminPage() {
  return <>
    <Link href="admin/users">Пользователи</Link>
    <br></br>
    <Link href="admin/routes">Маршруты</Link>
    <br></br>
    <Link href="admin/flights">Полёты</Link>
    <br></br>
    <Link href="admin/airports">Аэропорты</Link>
    <br></br>
    <Link href="admin/airplanes">Самолёты</Link>
    <br></br>
    <Link href="admin/tickets">Билеты</Link>
    <br></br>
    <Link href="admin/priecs">Цены</Link>
    <br></br>
    <Link href="admin/seats">Места</Link>
  </>;
}
