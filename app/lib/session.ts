import {getIronSession, SessionOptions} from "iron-session";

export interface SessionData {
  username: string;
  isLoggedIn: boolean;
  role: string;
}

export const defaultSession: SessionData = {
  username: "",
  isLoggedIn: false,
  role: "guest",
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