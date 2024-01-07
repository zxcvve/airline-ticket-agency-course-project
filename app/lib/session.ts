import { getIronSession, SessionOptions } from "iron-session";

export interface SessionData {
  userId: number;
  username: string;
  isLoggedIn: boolean;
  role: string;
  first_name: string;
  last_name: string;
}

export const defaultSession: SessionData = {
  userId: 0,
  username: "",
  isLoggedIn: false,
  role: "guest",
  first_name: "",
  last_name: "",
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: "air-app-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
