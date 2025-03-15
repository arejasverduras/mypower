import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../../../../auth";
import { User } from "@prisma/client";

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
// PATCH = update metadata
export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } },
): Promise<Response> 

{
  return auth(async (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      authreq: any & { auth?: { user?: User } }
  ) => {
      const { id } = await context.params;

  // 1. checks for a logged in user
      if (!authreq.auth?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }

  //   2. check if the workout exists
  const existingWorkout = await prisma.workout.findUnique({
      where: { id }
  })

  if (!existingWorkout) {
      return NextResponse.json({ error: "Workout not found"}, { status: 404})
  }

  // 3. Check if the user is the creator or a superuser
  const isSelfOrSuperuser =
          authreq?.auth?.user.id === id || authreq?.auth?.user.isSuperuser;

  if (!isSelfOrSuperuser) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const { body } = await req.json();


  // 4. Update the workouts metadata
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
          )(req, context) as Promise<Response>;
}

// Delete the workout here