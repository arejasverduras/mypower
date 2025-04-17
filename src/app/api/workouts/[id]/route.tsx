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
            exercises: {
               include: { 
                exercise: { include: {createdBy: true, tags: true} },
                  
              } 
            },
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
      return NextResponse.json({ error: "Workout not found" }, { status: 404 });
    }

  if (session.user.id !== workout.createdById && !session.user.isSuperuser ) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const body = await req.json();


      // 4. Update the exercise
      try {
        // Parse tags from the request body
        const tags = body.tags || [];
    
        // Update the workout, including tags
        const updatedWorkout = await prisma.workout.update({
          where: { id },
          data: {
            title: body.title,
            description: body.description,
            tags: {
              set: [], // Clear existing tags
              connectOrCreate: tags.map((tag: string) => ({
                where: { name: tag },
                create: { name: tag },
              })),
            },
          },
          include: {
            createdBy: true,
            tags: true,
            exercises: { include: { exercise: { include: { createdBy: true } } } },
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
