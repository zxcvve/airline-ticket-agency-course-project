import GenderSelector from "@/app/components/gender-selector";
import PhoneNumberInput from "@/app/components/phone-number-input";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export default function EditUserInfo() {
  return (
    <div className="">
      <form>
        <Input
          className="p-2"
          type="name"
          id="name"
          name="name"
          placeholder="Имя"
        />
        <Input
          className="p-2"
          type="secondName"
          id="secondName"
          name="secondName"
          placeholder="Фамилия"
        />
        <Input
          className="p-2"
          type="middleName"
          id="middleName"
          name="middleName"
          placeholder="Отчество"
        />
        <PhoneNumberInput />
        <GenderSelector />

        <div className="flex justify-center">
          <Button className="w-fit" type="submit">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}
