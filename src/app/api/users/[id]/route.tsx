import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../../../../auth";
import { Session, User } from "next-auth";

declare global {
    interface Request {
      auth?: Session | null;
    }
  }

  export async function GET(
    req: NextRequest,
    context: { params: { id: string } },
  ): Promise<Response> 
  
  {
    return auth(async (
        authreq: any & { auth?: { user?: User } }
    ) => {
        const { id } = context.params;
  
        // 1. checks for a logged in user
      //   if (!authreq?.auth?.user) {
      //   return NextResponse.json(
      //     { error: 'Unauthorized' },
      //     {
      //       status: 401,
      //       statusText: 'You must be logged in to perform this action',
      //     },
      //   );
      // } 
      
      try {
        const isSelfOrSuperuser =
          authreq?.auth?.user.id === id || authreq?.auth?.user.isSuperuser;
  
        const user = await prisma.user.findUnique({
          select: isSelfOrSuperuser
            ? undefined // Full data for superusers or own profile
            : {
                id: true,
                name: true,
                image: true,
                createdAt: true,
                createdExercises: true,
              }, // Limited data for others
          where: { id },

        });
  
        if (!user) {
          return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
          );
        }
  
        return NextResponse.json(user, { status: 200 });
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }
    }
            )(req, context) as Promise<Response>;
  }

