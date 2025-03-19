/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
// import { Session } from "@prisma/client";

// export interface NextAuthRequest extends NextApiRequest {
//   auth: Session | null;
// }

declare module "@auth/core/adapters" {
  interface AdapterUser {
    isSuperuser: boolean;
  }
}

declare module "next-auth" {
  interface User {
    isSuperuser: boolean;
  }
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, user }: { session: any; user: any }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.isSuperuser = user.isSuperuser;
      }
      return session;
    },
  },
};

// ✅ Use this instead of `auth()`
export const getAuthSession = async (req: NextApiRequest, res: NextApiResponse) => {
  return getServerSession(req, res, authOptions);
};

// ✅ NextAuth API Route Handler (for pages/api/auth/[...nextauth].ts)
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions);
}
