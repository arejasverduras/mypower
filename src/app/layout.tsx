/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { HeaderJara } from "./components/Header/Header";
import SessionContextProvider from "@/context/SessionContext"; // ✅ Use our custom session provider
import { SessionProvider } from "next-auth/react"; // ✅ NextAuth session provider

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MyPower: Fitness app",
  description: "Create and share workouts for your fitness goals",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider> {/* ✅ NextAuth's session provider */}
          <SessionContextProvider> {/* ✅ Our custom session context provider */}
            <HeaderJara />
            <main>{children}</main>
          </SessionContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
