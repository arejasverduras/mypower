import { Auth } from "@auth/core";
import GoogleProvider from "@auth/core/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma"; // Ensure your Prisma client is set up
import { Prisma } from "@prisma/client";

const handler = Auth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET, // Ensure this matches your .env
});

export { handler as GET, handler as POST };
