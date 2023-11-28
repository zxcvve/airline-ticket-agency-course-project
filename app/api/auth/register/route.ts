import bcrypt from "bcrypt";

export const dynamic = 'force-dynamic';
import {pool} from "@/app/lib/db";
import {z} from "zod";

async function validateCredentials(email: string, password: string) {
  const parsedCredentials = z
    .object({email: z.string().email(), password: z.string().min(6)})
    .safeParse({email, password});

  if (!parsedCredentials.success) {
    console.log("Invalid credentials", parsedCredentials.error);
    return false;
  }
  return parsedCredentials.data;
}

export async function registerUser(email: string, password: string) {
  const credentialsVaild = await validateCredentials(email, password);

  if(!credentialsVaild) {
    return false;
  }

  const hashedPassword = await bcrypt.hash(credentialsVaild.password, 10);

  try {
    const query: string = "INSERT INTO users (email, password) values ($1, $2)"
    const result = await pool.query(query,[credentialsVaild.email, hashedPassword])

    return result.rowCount == 1;
  } catch (err) {
    console.error("Error registering user", err);
    return false;
  }
}
export async function POST(request: Request) {
  const {email, password} = await request.json();
  const res = await registerUser(email, password);
  return {
    body: {
      success: res,
    },
  }
}