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

// TODO: rewrite it to use postgres
export async function loginUser(email: string, password: string) {
  const credentialsVaild = await validateCredentials(email, password);

  if (!credentialsVaild) {
    return false;
  }

  try {
    const query = "SELECT * FROM users WHERE email = $1"
    const result = await pool.query(query, [credentialsVaild.email]);

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
