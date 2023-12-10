import {clearIronSession} from "@/app/lib/actions";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await clearIronSession();
  return Response.redirect("http://localhost:3000/");
}
