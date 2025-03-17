/* eslint-disable @typescript-eslint/no-explicit-any */
import {  NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../../../../auth";
// import { User } from "@prisma/client";

// type NextAuthAPIRouteHandler = (req: NextRequest, context: { params: { id: string } }) => Promise<NextResponse>;



export async function GET(
  req:Request, 
  {params}: {params: Promise<{id:string}>}) {
  const { id } = await params;

  const exerciseId = id;
  
    try {
      const exercise = await prisma.exercise.findUnique({
          where: { id: exerciseId },
          include: {
            createdBy: {
              select: {id: true, name: true, image: true},
            }
          }
        });
    
        if (!exercise) {
          return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
        }
    
        return NextResponse.json(exercise, { status: 200 });
      } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }
};


// export async function PATCH(
//     req: NextRequest,
//   { params }: {params: { id: string } },): Promise<Response> {
//   return auth(async (
//     authreq: any & { auth?: { user?: User } }
//   ) => {
//     const { id } = await params;

//     // 1. Ensure the user is authenticated
//     if (!authreq.auth?.user) {
//       return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//     }

//     // 2. Fetch the exercise to check ownership
//     const exercise = await prisma.exercise.findUnique({
//       where: { id },
//       select: { createdById: true },
//     });

//     if (!exercise) {
//       return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
//     }

//     // 3. Check if the user is the creator or a superuser
//     if (exercise.createdById !== authreq.auth.user.id && !authreq.auth.user.isSuperuser) {
//       return NextResponse.json({ error: "Not authorized" }, { status: 403 });
//     }

//     const body = await req.json();

//     // 4. Update the exercise
//     try {
//       const updatedExercise = await prisma.exercise.update({
//         where: { id },
//         data: {
//           title: body.title || undefined,
//           video: body.video || undefined,
//           image: body.image || undefined,
//           description: body.description || undefined,
//           execution: body.execution || undefined,
//         },
//       });

//       return NextResponse.json(updatedExercise, { status: 200 });
//     } catch (error) {
//       console.error("Error updating exercise:", error);
//       return NextResponse.json({ error: "Failed to update exercise" }, { status: 500 });
//     }
//   })(req, {params}) as Promise<Response>;
// }

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } },
): Promise<NextResponse> {
  return auth(async () => {

    const { id } = await context.params;

    // 1. Ensure the user is authenticated
    if (!req.auth?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 2. Fetch the exercise to check ownership
    const exercise = await prisma.exercise.findUnique({
      where: { id: id as string },
      select: { createdById: true },
    });

    if (!exercise) {
      return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
    }

    // 3. Check if the user is the creator or a superuser
    if (exercise.createdById !== req.auth.user.id && !req.auth.user.isSuperuser) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    // 4. Delete the exercise
    try {
      await prisma.exercise.delete({
        where: { id: id as string },
      });

      return NextResponse.json({ message: "Exercise deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting exercise:", error);
      return NextResponse.json({ error: "Failed to delete exercise" }, { status: 500 });
    }

  })(req, context) as Promise<NextResponse>;
}



// // DELETE: Remove an exercise
// export async function DELETE(
//   req: NextRequest,
//   context: { params : {id: string} },
// ): Promise<Response> {
//   return auth(async (
//     authreq: any & { auth?: { user?: User } }
//   ) => {
//     const { id } = await context.params;

//     // 1. Ensure the user is authenticated
//     if (!authreq.auth?.user) {
//       return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//     }

//     // 2. Fetch the exercise to check ownership
//     const exercise = await prisma.exercise.findUnique({
//       where: { id },
//       select: { createdById: true },
//     });

//     if (!exercise) {
//       return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
//     }

//     // 3. Check if the user is the creator or a superuser
//     if (exercise.createdById !== authreq.auth.user.id && !authreq.auth.user.isSuperuser) {
//       return NextResponse.json({ error: "Not authorized" }, { status: 403 });
//     }

//     // 4. Delete the exercise
//     try {
//       await prisma.exercise.delete({
//         where: { id },
//       });

//       return NextResponse.json({ message: "Exercise deleted successfully" }, { status: 200 });
//     } catch (error) {
//       console.error("Error deleting exercise:", error);
//       return NextResponse.json({ error: "Failed to delete exercise" }, { status: 500 });
//     }
//   })(req, context) as Promise<Response>;
// }


