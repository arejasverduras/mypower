/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

// ✅ Force TypeScript to accept the adapter as valid
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as unknown as import("next-auth/adapters").Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        (session.user as any).isSuperuser = user.isSuperuser; // ✅ Workaround for custom field
      }
      return session;
    },
  },
};


// // ✅ Function to get session in API routes
// export const getAuthSession = async (req: any, res: any) => {
//   return getServerSession(req, res, authOptions);
// };

// ✅ Function to get session in API routes
export const getAuthSession = async (req: any, res: any) => {
  return getServerSession(req, res, authOptions);
};

// ✅ Default export for API route
export default function handler(req: any, res: any) {
  return NextAuth(req, res, authOptions);
}


