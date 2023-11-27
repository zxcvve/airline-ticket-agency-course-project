import {Button} from '@nextui-org/button'
import {Input} from "@nextui-org/input";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Вход</h1>
        <div className="flex flex-col justify-center items-center">
          <Input className="p-2" type="email" placeholder="Логин"/>
          <Input className="p-2" type="password" placeholder="Пароль"/>
          <Button className="">Войти</Button>
        </div>
      </div>
    </div>
  );
}