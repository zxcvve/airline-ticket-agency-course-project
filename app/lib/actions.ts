"use server";

import bcrypt from "bcrypt";
import { z } from "zod";
import sql from "./db";
import { PostgresError } from "postgres";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/app/lib/session";
import { cookies } from "next/headers";
import { user, flight, FlightInfo } from "@/app/lib/definitions";

async function validateCredentials(email: string, password: string) {
  const credentialsValid = z
    .object({ email: z.string().email(), password: z.string().min(6) })
    .safeParse({ email, password });

  if (!credentialsValid.success) {
    console.log("Invalid credentials", credentialsValid.error);
    return false;
  }
  return credentialsValid.data;
}

export async function registerUser(email: string, password: string) {
  const credentialsValid = await validateCredentials(email, password);

  if (!credentialsValid) {
    return false;
  }

  const hashedPassword = await bcrypt.hash(credentialsValid.password, 10);

  try {
    await sql`
      INSERT INTO "user" (email, password) values (${credentialsValid.email}, ${hashedPassword})    
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
      SELECT * FROM "user" WHERE email = ${credentialsValid.email}
    `;

    if (users.count === 0) {
      console.log("No user found with email", credentialsValid.email);
      return "No user found with that email";
    }

    const user: user = users[0] as user;

    const passwordMatches = await bcrypt.compare(
      credentialsValid.password,
      user.password,
    );

    if (!passwordMatches) {
      console.log("Password does not match");
      return "Wrong password";
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

export async function getUserOrders(userId: number) {}

export async function getFlightList() {
  const flights: flight[] = await sql`
    SELECT * FROM "flight"
  `;
  return flights;
}

export async function getFlightInfoList() {
  const flights: FlightInfo[] = await sql`
    SELECT * FROM "flight_info"
  `;
  return flights;
}