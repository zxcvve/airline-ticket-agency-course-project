// import {pool} from "@/app/lib/actions";
import bcrypt from "bcrypt";
// import {sql} from "slonik";
import {Pool} from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const {email, password} = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const query = "INSERT INTO users (email, password) values ($1, $2)"
    const result = await pool.query(query,[email, hashedPassword])

    return result.rowCount == 1;
  } catch (err) {
    console.error("Error registering user", err);
    return false;
  }
}