import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

// Extend NextRequest to include authentication data
export interface NextAuthRequest extends NextRequest {
  auth: {
    id: string;
    sessionToken: string;
    userId: string;
    expires: string;
  } | null | undefined;
}

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

// Define NextAuth with proper context handling
export const nextAuth = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.isSuperuser = user.isSuperuser;
      }
      return session;
    },
  },
});

// Apply the fix for proper dynamic route handling
export const auth = nextAuth.auth as typeof nextAuth.auth &
  (<HandlerResponse extends Response | Promise<Response>>(
    handler: (
      req: NextAuthRequest,
      context: { params: Record<string, string | string[] | undefined> }
    ) => HandlerResponse
  ) => (
    req: NextRequest,
    context: { params: Record<string, string | string[] | undefined> }
  ) => HandlerResponse);

export const { handlers, signIn, signOut } = nextAuth;
