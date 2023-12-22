import { SessionData, sessionOptions } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import Link from "next/link";

async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return session;
}
export default function UserInfo() {
  return (
    <div>
      <Content />
    </div>
  );
}

async function Content() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/login");
  } else {
    return (
      <>
        <p>Hello {session.username}!</p>
        <p>Your role: {session.role}</p>
        <Link href="/account/edit">Редактировать информацию</Link>
      </>
    );
  }
}
