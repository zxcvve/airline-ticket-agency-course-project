"use server";

import bcrypt from "bcrypt";
import { z } from "zod";
import sql from "./db";
import { PostgresError } from "postgres";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/app/lib/session";
import { cookies } from "next/headers";
import { User } from "@/app/lib/definitions";

async function validateCredentials(email: string, password: string) {
  const parsedCredentials = z
    .object({ email: z.string().email(), password: z.string().min(6) })
    .safeParse({ email, password });

  if (!parsedCredentials.success) {
    console.log("Invalid credentials", parsedCredentials.error);
    return false;
  }
  return parsedCredentials.data;
}

export async function registerUser(email: string, password: string) {
  const parsedCredentials = await validateCredentials(email, password);

  if (!parsedCredentials) {
    return "Failed to parse credentials";
  }

  const hashedPassword = await bcrypt.hash(parsedCredentials.password, 10);

  try {
    return await sql`
      INSERT INTO users (email, password) values (${parsedCredentials.email}, ${hashedPassword})    
`;
  } catch (err: any | PostgresError) {
    // console.error("Error registering user", err);
    if (err.code == 23505) {
      return "Email already exists";
    }

    return "Unknown error";
  }
}

export async function loginUser(email: string, password: string) {
  const credentialsValid = await validateCredentials(email, password);

  if (!credentialsValid) {
    return false;
  }

  try {
    const users = await sql`
      SELECT * FROM users WHERE email = ${credentialsValid.email}
    `;

    if (users.count === 0) {
      console.log("No user found with email", credentialsValid.email);
      return false;
    }

    const user: User = users[0] as User;

    const passwordMatches = await bcrypt.compare(
      credentialsValid.password,
      user.password,
    );

    if (!passwordMatches) {
      console.log("Password does not match");
      return false;
    }

    await setIronSession(user.email, user.role);
    return true;
  } catch (err) {
    console.error("Error logging in user", err);
    return false;
  }
}

async function setIronSession(email: string, role: string) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  session.isLoggedIn = true;
  session.username = email;
  session.role = role;

  await session.save();
}

export async function clearIronSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  session.isLoggedIn = false;
  session.username = "";
  session.role = "";

  await session.save();
}
