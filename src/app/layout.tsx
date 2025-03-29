/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { HeaderJara } from "./components/Header/Header";
import SessionContextProvider from "@/context/SessionContext"; // ✅ Use only this
import { MessageProvider } from "@/context/MessageContext";
import { ApiMessage } from "./components/UI functions/ApiMessage/ApiMessage";

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
      <MessageProvider>
        <SessionContextProvider> {/* ✅ Only this is needed */}
          
            <ApiMessage />
            <HeaderJara />
            <main>{children}</main>
          
        </SessionContextProvider>
        </MessageProvider>
      </body>
    </html>
  );
}
