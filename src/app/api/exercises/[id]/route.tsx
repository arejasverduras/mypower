/* eslint-disable @typescript-eslint/no-explicit-any */
import {  NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth, NextAuthRequest } from "../../../../../auth";



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

// export async function DELETE(
//   req: NextRequest,
//   context: { params: { id: string } }
// ): Promise<NextResponse> {
//   return auth(async (authreq: any & { auth?: { user?: User } }) => {
//     const { id } = context.params;

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
//   })(req, context) as Promise<NextResponse>;
// }


export const PATCH = auth(async (
  req: NextAuthRequest,
  context: { params: Record<string, string | string[] | undefined> } // ✅ Corrected Type
): Promise<NextResponse> => {
  const id = context.params.id as string; // ✅ Type assertion to ensure ID is a string

  // 1. Ensure the user is authenticated
  if (!req.auth) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  console.log("PATCH request for ID:", id); // ✅ Debugging

  return NextResponse.json({ message: "Success" }, { status: 200 });
});




// export const DELETE = auth(async (
//   req: NextAuthRequest,
//   { params }: { params: Record<string, string | string[] | undefined> }

// ): Promise<NextResponse> => {
//   const id = Array.isArray(params.id) ? params.id[0] : params.id;

//   // 1. Ensure the user is authenticated
//   if (!req.auth) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }

//   // 2. Fetch the exercise to check ownership
//   const exercise = await prisma.exercise.findUnique({
//     where: { id },
//     select: { createdById: true },
//   });

//   if (!exercise) {
//     return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
//   }

//   // 3. Check if the user is the creator or a superuser
//   if (exercise.createdById !== req.auth.userId && !req.auth.isSuperuser) {
//     return NextResponse.json({ error: "Not authorized" }, { status: 403 });
//   }

//   // 4. Delete the exercise
//   try {
//     await prisma.exercise.delete({ where: { id } });
//     return NextResponse.json({ message: "Exercise deleted successfully" }, { status: 200 });
//   } catch (error) {
//     console.error("Error deleting exercise:", error);
//     return NextResponse.json({ error: "Failed to delete exercise" }, { status: 500 });
//   }
// });





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


