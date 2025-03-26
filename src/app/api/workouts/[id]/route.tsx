/* eslint-disable @typescript-eslint/no-explicit-any */
import {  NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../auth";


export async function GET(req:Request, {params}: {params: Promise<{id:string}>}) {
  const { id } = await params;

  
    try {
      const workout = await prisma.workout.findUnique({
          where: { id },
          include: {
            createdBy: true,
            tags: true,
            exercises: { include: { exercise: { include: {createdBy: true}} } },
            likedBy: true,
            programs: true,
          },
        });
    
        if (!workout) {
          return NextResponse.json({ error: "Workout not found" }, { status: 404 });
        }
    
        return NextResponse.json(workout, { status: 200 });
      } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }
}

export const PATCH = async (req: Request, {params}: {params: {id:string}}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = params;

      // 2. Fetch the exercise to check ownership
    const workout = await prisma.workout.findUnique({
      where: { id },
      select: { createdById: true },
    });

    if (!workout) {
      return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
    }

  if (session.user.id !== workout.createdById && !session.user.isSuperuser ) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const body = await req.json();

      // 4. Update the exercise
      try {
        const updatedWorkout = await prisma.workout.update({
          where: { id },
          data: {
            title: body.title,
            description: body.description,
            // image: body.image
          },
          include: {
            createdBy: true,
            tags: true,
            exercises: { include: { exercise: { include: {createdBy: true}} } },
            likedBy: true,
            programs: true,
          },
        });
    
        return NextResponse.json(updatedWorkout, { status: 200 });
      } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }

}
// PATCH = update metadata
// export async function PATCH(
//   req: NextRequest,
//   context: { params: { id: string } },
// ): Promise<Response> 

// {
//   return auth(async (

//       authreq: any & { auth?: { user?: User } }
//   ) => {
//       const { id } = await context.params;

//   // 1. checks for a logged in user
//       if (!authreq.auth?.user) {
//       return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//       }

//   //   2. check if the workout exists
//   const existingWorkout = await prisma.workout.findUnique({
//       where: { id }
//   })

//   if (!existingWorkout) {
//       return NextResponse.json({ error: "Workout not found"}, { status: 404})
//   }

//   // 3. Check if the user is the creator or a superuser
//   const isSelfOrSuperuser =
//           authreq?.auth?.user.id === id || authreq?.auth?.user.isSuperuser;

//   if (!isSelfOrSuperuser) {
//       return NextResponse.json({ error: "Not authorized" }, { status: 403 });
//   }

//   const { body } = await req.json();


  // 4. Update the workouts metadata
  // try {
  //     const updatedWorkout = await prisma.workout.update({
  //       where: { id },
  //       data: {
  //         title: body.title,
  //         description: body.description,
  //         // image: body.image
  //       },
  //       include: {
  //         createdBy: true,
  //         tags: true,
  //         exercises: { include: { exercise: { include: {createdBy: true}} } },
  //         likedBy: true,
  //         programs: true,
  //       },
  //     });
  
  //     return NextResponse.json(updatedWorkout, { status: 200 });
  //   } catch (error) {
  //     console.log(error);
  //     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  //   }
  // }
//           )(req, context) as Promise<Response>;
// }

// Delete the workout here


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = params;

  // 1. Fetch the workout to check ownership
  const workout = await prisma.workout.findUnique({
    where: { id },
    select: { createdById: true },
  });

  if (!workout) {
    return NextResponse.json({ error: "Workout not found" }, { status: 404 });
  }

  // 2. Check if user is creator or a superuser
  if (session.user.id !== workout.createdById && !session.user.isSuperuser) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  // 3. Delete related records first to prevent foreign key errors
  try {
    await prisma.likedItem.deleteMany({ where: { workoutId: id } });
    await prisma.workoutExercise.deleteMany({ where: { workoutId: id } });
    await prisma.programWorkout.deleteMany({ where: { workoutId: id } });

    // 4. Now delete the workout itself
    await prisma.workout.delete({ where: { id } });

    return NextResponse.json({ message: "Workout deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting workout:", error);
    return NextResponse.json({ error: "Failed to delete workout" }, { status: 500 });
  }
}
