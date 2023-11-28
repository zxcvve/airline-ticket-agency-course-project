"use client"

import bcrypt from 'bcrypt';
import {createPool, sql} from 'slonik';
import {z} from 'zod';

export const pool = await createPool(process.env.DATABASE_URL!)



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

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(sql.unsafe`
      INSERT INTO users (email, password) values (${credentialsVaild.email}, ${credentialsVaild.password})
    `);

    return result.rowCount == 1;
  } catch (err) {
    console.error("Error registering user", err);
    return false;
  }
}

export async function loginUser(email: string, password: string) {
  const credentialsVaild = await validateCredentials(email, password);

  if(!credentialsVaild) {
    return false;
  }

  try {
    const result = await pool.query(sql.unsafe`
      SELECT * FROM users WHERE email = ${credentialsVaild.email}
    `);

    if (result.rowCount == 0) {
      console.log("No user found with email", credentialsVaild.email)
      return false;
    }

    const user = result.rows[0];

    const passwordMatches = await bcrypt.compare(credentialsVaild.password, user.password);

    if (!passwordMatches) {
      console.log("Password does not match")
      return false;
    }

    return true;
  } catch (err) {
    console.error("Error logging in user", err);
    return false;
  }
}

export async function handleRegister(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = Object.fromEntries(formData).email;
    const password = Object.fromEntries(formData).password;

    await registerUser(email, password);
  } catch (error) {
    console.error(error);
  }
}