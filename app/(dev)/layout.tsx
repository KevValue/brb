import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { cookies } from 'next/headers'
import Nav from '@/src/globalComponents/Nav'
import Banner from '@/src/globalComponents/Banner'

import { SessionCtxFC } from '@/src/ctx/sessionCtx'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "lil api",
  description: "new cool kid on the block",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('sessionID')

  if (!sessionCookie?.value) console.log("no session")

  let authSessionOK = false

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionCtxFC browserCookie={sessionCookie?.value} initSession={authSessionOK}>
          <Nav />
          <Banner />
          {children}
        </SessionCtxFC>
      </body>
    </html>
  );
}
