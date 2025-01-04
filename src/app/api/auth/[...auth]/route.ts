import { Auth } from "@auth/core";
import GoogleProvider from "@auth/core/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET, // Ensure this matches your .env
  callbacks: {
    async session({ session, user }) {
      // Include the user's ID in the session object
      session.user.id = user.id;
      return session;
    },
  },
}

export async function GET(request: Request) {
  return Auth(request, authOptions); // Pass the request and config
}

export async function POST(request: Request) {
  return Auth(request, authOptions); // Pass the request and config
}