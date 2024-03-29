import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import NavigationBar from "./navigation-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Агентство по продаже авиабилетов «Крутое пике»"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body>
        <Providers>
          <NavigationBar />
          <div className="flex justify-center items-center">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
