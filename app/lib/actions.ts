"use server";

import bcrypt from "bcrypt";
import { z } from "zod";
import sql from "./db";
import { PostgresError } from "postgres";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/app/lib/session";
import { cookies } from "next/headers";
import {
  user,
  flight,
  FlightInfo,
  Seat,
  TicketInfo,
  userWithoutPassword,
} from "@/app/lib/definitions";
import { redirect } from "next/navigation";

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
    return "Invalid credentials";
  }

  const hashedPassword = await bcrypt.hash(credentialsValid.password, 10);

  try {
    const res = await sql`
      SELECT insert_user(${credentialsValid.email}, ${hashedPassword})  
    `;
    const [id, role, first_name, last_name] = res[0].insert_user
      .slice(1, -1)
      .split(",");
    await setIronSession(
      id,
      credentialsValid.email,
      role,
      first_name,
      last_name,
    );
  } catch (err: any | PostgresError) {
    console.log(err)
    if (err.code == 23505) {
      return "Email already exists";
    }

    return "Unknown error";
  }
  return 0;
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

    await setIronSession(
      user.id,
      user.email,
      user.role,
      user.first_name,
      user.last_name,
    );
    return true;
  } catch (err) {
    console.error("Error logging in user", err);
    return false;
  }
}

async function setIronSession(
  userId: number,
  email: string,
  role: string,
  first_name: string,
  last_name: string,
) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  session.userId = userId;
  session.isLoggedIn = true;
  session.username = email;
  session.role = role;
  session.first_name = first_name;
  session.last_name = last_name;

  await session.save();
}

export async function clearIronSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  session.userId = 0;
  session.isLoggedIn = false;
  session.username = "";
  session.role = "";
  session.first_name = "";
  session.last_name = "";

  await session.save();
}

export async function getUserOrders(userId: number) {
  const orders: TicketInfo[] = await sql`
    SELECT * FROM "user_tickets" WHERE user_id = ${userId}
  `;
  return orders;
}

export async function getUserInfo(userId: number) {
  const user: userWithoutPassword[] = await sql`
    SELECT * FROM "user_info_without_password" WHERE id = ${userId}
  `;
  return user[0];
}

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

export async function getFlightInfo(id: number) {
  const flights: FlightInfo[] = await sql`
    SELECT * FROM "flight_info" WHERE flight_id = ${id}
  `;
  return flights[0];
}

export async function newOrder(
  passenger: number,
  flight: number,
  price: number,
  seat: number,
) {
  const flights: FlightInfo[] = await sql`
    INSERT INTO "ticket" (passenger, flight, price, seat) VALUES (${passenger}, ${flight}, ${price}, ${seat})
  `;
  return redirect("/orders");
}

export async function getFreeSeats(flight_id: number, limit?: number) {
  if (limit) {
    const seats: Seat[] = await sql`
    SELECT * FROM "seats" WHERE flight_id = ${flight_id} AND is_occupied = false LIMIT ${limit}
  `;
    return seats;
  }

  const seats: Seat[] = await sql`
    SELECT * FROM "seats" WHERE flight_id = ${flight_id} AND is_occupied = false
  `;
  return seats;
}

export async function updateUserInfo(
  userId: number,
  first_name: string | null,
  last_name: string | null,
  middle_name: string | null,
  phone: string | null,
  isMale: boolean | null,
) {
  try {
    const res = await sql`
    UPDATE "user"
    SET 
      first_name = COALESCE(${first_name}, first_name),
      last_name = COALESCE(${last_name}, last_name),
      middle_name = COALESCE(${middle_name}, middle_name),
      phone_number = COALESCE(${phone}, phone_number),
      isMale = COALESCE(${isMale}, isMale)
    WHERE id = ${userId}
  `;
    return "Успешно обновлено";
  } catch (err) {
    return "Произошла ошибка";
  }
}
