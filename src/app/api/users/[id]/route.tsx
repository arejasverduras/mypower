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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        authreq: any & { auth?: { user?: User } }
    ) => {
        const { id } = await context.params;
      
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
                bio: true,
                quote: true,
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

