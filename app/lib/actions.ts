import bcrypt from 'bcrypt';
import {z} from 'zod';
import sql from './db';
import {PostgresError} from "postgres";

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
      return "Email already exists"
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
      console.log("No user found with email", credentialsValid.email)
      return false;
    }

    const user = users[0];

    const passwordMatches = await bcrypt.compare(credentialsValid.password, user.password);

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
