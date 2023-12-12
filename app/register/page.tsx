import LoginForm from "@/app/components/login-form";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/app/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegistrationForm from "../components/registration-form";

async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return session;
}

async function Content() {
  const session = await getSession();
  if (session.isLoggedIn) {
    redirect("/account");
  } else {
    return (
      <>
        <RegistrationForm />
      </>
    );
  }
}

export default function RegistrationPage() {
  return <Content />;
}
