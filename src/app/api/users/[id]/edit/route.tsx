import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../../../../../auth";
import { User } from "next-auth";

export async function PATCH(
    req: NextRequest,
    context: { params: { id: string } },
  ): Promise<Response> 

  {
    return auth(async (
        authreq: any & { auth?: { user?: User } }
    ) => {
        const { id } = context.params;
  
        // 1. checks for a logged in user

          if (!authreq.auth?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

    //   check if the user exists
    const existingUser = await prisma.user.findUnique({
        where: { id }
    })

    if (!existingUser) {
        return NextResponse.json({ error: "User not found"}, { status: 404})
    }

    // Check if the user is the creator or a superuser
    const isSelfOrSuperuser =
            authreq?.auth?.user.id === id || authreq?.auth?.user.isSuperuser;

    if (!isSelfOrSuperuser) {
        return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const body = await req.json();

    // Update the user
        try {
            const updatedUser = await prisma.user.update({
              where: { id },
              data: body,
            });


  
        return NextResponse.json(updatedUser, { status: 200 });
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

  // Update the exercise
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

// export const PATCH = auth(async function PATCH(req, { params }: { params: Promise<{ id: string }> }) {
//     const { id } = await params; // Await params because it's now a Promise
//     const body = await req.json();
  
//     console.log("Session object in API route:", req.auth); // Log the session object
  
  
//     // Ensure the user is authenticated
//     if (!req.auth) {
//       return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//     }
  
//     try {
//       // Fetch the exercise to check ownership
//       const exercise = await prisma.exercise.findUnique({
//         where: { id },
//         select: { createdById: true },
//       });
  
//       if (!exercise) {
//         return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
//       }
  
//       // Check if the user is the creator or a superuser
//       if (exercise.createdById !== req.auth.user.id && !req.auth.user.isSuperuser) {
//         return NextResponse.json({ error: "Not authorized" }, { status: 403 });
//       }
  
//       // Update the exercise
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
//   });


// curl -X PATCH \
// -H "Content-Type: application/json" \
// -H "Authorization: Bearer 8a390ac3-291b-4fa0-a506-965e92e2d255" \
// -d '{"name": "Jara"}' \
// http://localhost:3000/api/users/<id>/edit
