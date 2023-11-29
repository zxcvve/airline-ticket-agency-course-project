import type {Metadata} from 'next'import './globals.css'import {Providers} from "./providers";import NavigationBar from "@/app/components/navigation-bar";export const metadata: Metadata = {  title: 'Жмых Airlines',}export default function RootLayout({children}: { children: React.ReactNode }) {  return (    <html lang="en" className='dark'>    <body>    <Providers>      <NavigationBar/>        {children}    </Providers>    </body>    </html>  );}