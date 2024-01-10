"use server";

import bcrypt from "bcrypt";
import { z } from "zod";
import sql from "./db";
import { PostgresError } from "postgres";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/app/lib/session";
import { cookies } from "next/headers";
import {
  User,
  Flight,
  FlightInfo,
  Seat,
  TicketInfo,
  UserWithoutPassword,
  Airplane,
  Airport,
  Route,
  RouteInfo,
  TicketPriceToAdd,
} from "@/app/lib/definitions";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";

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
    console.log(err);
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

    const user: User = users[0] as User;

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
  const user: UserWithoutPassword[] = await sql`
    SELECT * FROM "user_info_without_password" WHERE id = ${userId}
  `;
  return user[0];
}

export async function getUsersList() {
  const user: UserWithoutPassword[] = await sql`
    SELECT * FROM "user_info_without_password" ORDER BY id
  `;
  return user;
}

export async function getFlightList() {
  const flights: Flight[] = await sql`
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
  email?: string | null,
  role?: string | null,
) {
  if (role) {
    try {
      const res = await sql`
      UPDATE "user"
      SET 
        role = ${role}
      WHERE id = ${userId}
    `;
      revalidateTag("userData");
    } catch (err) {}
  }

  if (email) {
    try {
      const res = await sql`
      UPDATE "user"
      SET 
        email = ${email}
      WHERE id = ${userId}
    `;
      revalidateTag("userData");
    } catch (err) {}
  }

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
    revalidateTag("userData");
    return "Успешно обновлено";
  } catch (err) {
    return "Произошла ошибка";
  }
}

export async function getUsers() {
  const users: UserWithoutPassword[] = await sql`
    SELECT * FROM "user_info_without_password"
  `;
  return users;
}

export async function getAirplanes() {
  const airplanes: Airplane[] = await sql`
    SELECT * FROM "airplane" ORDER BY id
  `;
  return airplanes;
}

export async function getAirplaneInfo(id: number) {
  const airplanes: Airplane[] = await sql`
    SELECT * FROM "airplane" WHERE id = ${id}
  `;
  return airplanes[0];
}

export async function updateAirplaneInfo(
  id: number,
  model: string,
  reg_number: string,
) {
  try {
    const res = await sql`
      UPDATE "airplane"
      SET 
        model = ${model},
        reg_number = ${reg_number}
      WHERE id = ${id}
    `;
    revalidatePath("/admin/airplanes");
    return "Успешно обновлено";
  } catch (error) {
    return "Произошла ошибка";
  }
}

export async function getAirports() {
  const airports: Airport[] = await sql`
    SELECT * FROM "airport" ORDER BY id
  `;
  return airports;
}

export async function getAirportInfo(id: number) {
  const airports: Airport[] = await sql`
    SELECT * FROM "airport" WHERE id = ${id}
  `;
  return airports[0];
}

export async function updateAirportInfo(
  id: number,
  title: string,
  city: string,
  country: string,
  address: string,
  coordinates: string,
) {
  try {
    const res = await sql`
        UPDATE "airport"
        SET 
          title = ${title},
          city = ${city},
          country = ${country},
          address = ${address},
          coordinates = ${coordinates}
        WHERE id = ${id}
      `;
    revalidatePath("/admin/airports");
    return "Успешно обновлено";
  } catch (error) {
    return "Произошла ошибка";
  }
}

export async function getFlights() {
  const flights: Flight[] = await sql`
    SELECT * FROM "flight"
  `;
  return flights;
}

// export async function getPrices(){
//   const prices: TicketInfo[] = await sql`
//     SELECT * FROM "ticket_info"
//   `;
//   return prices;
// }

export async function getTickets() {
  const tickets: TicketInfo[] = await sql`
    SELECT * FROM "ticket_info"
  `;
  return tickets;
}

export async function getTicketInfo(id: number) {
  const tickets: TicketInfo[] = await sql`
    SELECT * FROM "ticket_info" WHERE ticket_id = ${id}
  `;
  return tickets[0];
}

export async function getRoutes() {
  const routes: RouteInfo[] = await sql`
    SELECT * FROM "route_info" ORDER BY id
  `;
  return routes;
}

export async function getRoute(id: number) {
  const routes: Route[] = await sql`
    SELECT * FROM "route" WHERE id = ${id}
  `;
  return routes[0];
}

export async function updateRouteInfo(
  id: number,
  from: number,
  to: number,
  duration: string,
) {
  try {
    const res = await sql`
        UPDATE "route"
        SET 
          departure_airport = ${from},
          arrival_airport = ${to},
          flight_duration = ${duration}
        WHERE id = ${id}
      `;
    revalidatePath("/admin/routes");
    return "Успешно обновлено";
  } catch (error) {
    return "Произошла ошибка";
  }
}

export async function insertFlightWithPrice(
  flight_number: string,
  departure_time: Date,
  airplane_id: number,
  route_id: number,
  minimal_price: TicketPriceToAdd,
) {
  try {
    const res = await sql.begin((sql) => [
      sql`CALL add_flight_and_price(${flight_number}, ${departure_time}, ${airplane_id}, ${route_id}, '30 days', ${minimal_price.base_price})`,
    ]);
    revalidatePath("/admin/flights");
    return "Успешно добавлено";
  } catch (error) {
    return "Произошла ошибка";
  }
}
