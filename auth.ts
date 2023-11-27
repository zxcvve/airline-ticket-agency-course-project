import NextAuth from 'next-auth';
import PostgresAdapter from "@auth/pg-adapter"
import {Pool} from 'pg';
import {authConfig} from "@/auth.config";
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';


const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// async function getUser(email: string): Promise<User | undefined> {
//   try {
//     const user = await pool.query<User>('SELECT * FROM users WHERE email=$1', [email]);
//     return user.rows[0];
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await pool.query<User>('SELECT * FROM users WHERE email=$1', [email]);
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// @ts-ignore
export const {handlers, auth, signIn, signOut} = NextAuth({
  ...authConfig, adapter: PostgresAdapter(pool), providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
        console.log(`Creds: ${parsedCredentials}`)

        if (parsedCredentials.success) {
          const {email, password} = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});


// async function getUser(email: string): Promise<User | undefined> {
//   try {
//     const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
//     return user.rows[0];
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }


// export const {auth, signIn, signOut} = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const parsedCredentials = z
//           .object({email: z.string().email(), password: z.string().min(6)})
//           .safeParse(credentials);
//
//         if (parsedCredentials.success) {
//           const {email, password} = parsedCredentials.data;
//           const user = await getUser(email);
//           if (!user) return null;
//           const passwordsMatch = await bcrypt.compare(password, user.password);
//
//           if (passwordsMatch) return user;
//         }
//
//         console.log('Invalid credentials');
//         return null;
//       },
//     }),
//   ],
// });