import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

declare module "next-auth" {
  interface User {
    id?: string | undefined;
    isSuperuser: boolean;
  }

  interface Session {
    user: User;
    isSuperuser: boolean,
  }
}

 
export const { handlers, signIn, signOut, auth } = NextAuth({
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
      // Include the user's ID in the session object
      console.log("Session callback:", { session, user }); // Log the session and user objects


      if (session.user) {
        session.user.id = user.id;
        // session.user.isSuperuser = user.isSuperuser;
        session.isSuperuser = user.isSuperuser;
      }
      
      return session;
    },
    // authorized: async({auth}) => {
    //   return !!auth
    // }

  },
})
