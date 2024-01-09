import { getUsersList } from "@/app/lib/actions";
import UsersTable from "./users-table";

export default async function UserList() {
  const users = await getUsersList();

  const tableColumns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "first_name",
      label: "Имя",
    },
    {
      key: "last_name",
      label: "Фамилия",
    },
    {
      key: "middle_name",
      label: "Отчество",
    },
    {
      key: "gender",
      label: "Пол",
    },
    {
      key: "phone_number",
      label: "Телефон",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Роль",
    }
  ];

  return (
    <div>
      <h1>Список пользователей</h1>
      <UsersTable users={users} columns={tableColumns} />
    </div>
  );
}
