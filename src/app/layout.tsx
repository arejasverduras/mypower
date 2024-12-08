import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { HeaderJara } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeaderJara />
        <Hero />
        <main>
          {children}
        </main>
        
      </body>
    </html>
  );
}
