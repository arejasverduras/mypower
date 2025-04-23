/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../auth";

// Add an exercise to a workout
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = params;

  // Check if the workout exists
  const existingWorkout = await prisma.workout.findUnique({
    where: { id },
    include: {
      exercises: true, // Include exercises to calculate the next order value
    },
  });

  if (!existingWorkout) {
    return NextResponse.json({ error: "Workout not found" }, { status: 404 });
  }

  // Check if the user is the creator or a superuser
  const isSelfOrSuperuser =
    session.user.id === existingWorkout.createdById || session.user.isSuperuser;

  if (!isSelfOrSuperuser) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    const { exerciseId } = await req.json();

    // Determine the next order value
    const nextOrder = existingWorkout.exercises.length + 1;

    // Add the exercise to the workout with the correct order
    const updatedWorkout = await prisma.workout.update({
      where: { id },
      data: {
        exercises: {
          create: {
            exerciseId,
            order: nextOrder, // Set the order for the new exercise
          },
        },
      },
      include: {
        exercises: { include: { exercise: { include: { createdBy: true } } } },
        createdBy: true,
        tags: true,
        likedBy: true,
        programs: true,
      },
    });

    return NextResponse.json(updatedWorkout, { status: 200 });
  } catch (error) {
    console.error("Error adding exercise to workout:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Edit exercise metadata in a workout
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = params;

  // Check if the workout exists
  const existingWorkout = await prisma.workout.findUnique({
    where: { id },
  });

  if (!existingWorkout) {
    return NextResponse.json({ error: "Workout not found" }, { status: 404 });
  }

  // Check if the user is the creator or a superuser
  const isSelfOrSuperuser =
    session.user.id === existingWorkout.createdById || session.user.isSuperuser;

  if (!isSelfOrSuperuser) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    const { exerciseId, customDescription, customSets, customRepetitions, customBreak, customExecution, customRest } = await req.json();

    // Update the exercise metadata in the workout
    await prisma.workoutExercise.update({
      where: {
        workoutId_exerciseId: {
          workoutId: id,
          exerciseId,
        },
      },
      data: {
        customDescription,
        customSets,
        customRepetitions,
        customBreak,
        customExecution,
        customRest,
      },
    });

    // Fetch the full updated workout with all relationships
    const updatedWorkout = await prisma.workout.findUnique({
      where: { id },
      include: {
        exercises: { include: { exercise: { include: { createdBy: true } } } },
        createdBy: true,
        tags: true,
        likedBy: true,
        programs: true,
      },
    });

    return NextResponse.json(updatedWorkout, { status: 200 });
  } catch (error) {
    console.error("Error updating exercise metadata:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


// Change the order of exercises in a workout
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = params;

  // Check if the workout exists
  const existingWorkout = await prisma.workout.findUnique({
    where: { id },
  });

  if (!existingWorkout) {
    return NextResponse.json({ error: "Workout not found" }, { status: 404 });
  }

  // Check if the user is the creator or a superuser
  const isSelfOrSuperuser =
    session.user.id === existingWorkout.createdById || session.user.isSuperuser;

  if (!isSelfOrSuperuser) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    const { exerciseOrder } = await req.json();

    if (!Array.isArray(exerciseOrder)) {
      return NextResponse.json({ error: "Invalid exercise order format" }, { status: 400 });
    }

    // Update the order of exercises
    await Promise.all(
      exerciseOrder.map((exerciseId: string, index: number) =>
        prisma.workoutExercise.update({
          where: {
            workoutId_exerciseId: {
              workoutId: id,
              exerciseId,
            },
          },
          data: {
            order: index + 1, // Set the order based on the array index
          },
        })
      )
    );

     // Fetch the full updated workout with all relationships
     const updatedWorkout = await prisma.workout.findUnique({
      where: { id },
      include: {
        exercises: { 
            include: { 
              exercise: { 
                include: { 
                  createdBy: true 
                        } 
                      } 
                    },
            orderBy: { order: "asc" }, // Ensure the exercises are returned in the correct order
        },
        createdBy: true,
        tags: true,
        likedBy: true,
        programs: true,
        
      },
      
    });

    return NextResponse.json(updatedWorkout, { status: 200 });
  } catch (error) {
    console.error("Error updating exercise order:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


// Delete an exercise from a workout
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = params;

  // Check if the workout exists
  const existingWorkout = await prisma.workout.findUnique({
    where: { id },
  });

  if (!existingWorkout) {
    return NextResponse.json({ error: "Workout not found" }, { status: 404 });
  }

  // Check if the user is the creator or a superuser
  const isSelfOrSuperuser =
    session.user.id === existingWorkout.createdById || session.user.isSuperuser;

  if (!isSelfOrSuperuser) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    const { exerciseId } = await req.json();

    // Delete the exercise from the workout
    const updatedWorkout = await prisma.workout.update({
      where: { id },
      data: {
        exercises: {
          delete: {
            id: exerciseId,
          },
        },
      },
      include: {
        createdBy: true,
        tags: true,
        likedBy: true,
        programs: true,
        // Include the exercises with their metadata
        exercises: { include: { exercise: { include: { createdBy: true } } } },
        
      },
    });

    return NextResponse.json(updatedWorkout, { status: 200 });
  } catch (error) {
    console.error("Error deleting exercise from workout:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}