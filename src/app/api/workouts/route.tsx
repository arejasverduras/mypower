import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { auth } from '../../../../auth';

// GET requests
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search')?.toLowerCase() || '';

  try {
    const workouts = await prisma.workout.findMany({
      where: {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
          { tags: { some: { name: { contains: search } } } },
          { createdBy: { name: { contains: search } } },
          { exercises: { some: { exercise: { title: { contains: search } } } } },
        ],
      },
      include: {
        createdBy: true,
        tags: true,
        exercises: { include: { exercise: true } },
        likedBy: true,
        programs: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(workouts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST requests
export const POST = auth(async function POST(req: Request) {
  const body = await req.json();
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated to POST workout" }, { status: 401 });
  }

  if (!body.title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  try {
    console.log("Creating workout with data:", body);

    const newWorkout = await prisma.workout.create({
      data: {
        title: body.title,
        description: body.description || null,
        isPublic: body.isPublic || true,
        createdBy: { connect: { id: session.user.id } },
        exercises: {
          create: body.exercises.map((exercise: Prisma.WorkoutExerciseCreateWithoutWorkoutInput) => ({
            exercise: { connect: { id: exercise.id } },
            customDescription: exercise.customDescription || null,
            customSets: exercise.customSets || null,
            customRepetitions: exercise.customRepetitions || null,
          })),
        },
        tags: {
          connectOrCreate: body.tags.map((tag: Prisma.TagCreateOrConnectWithoutWorkoutsInput) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        createdBy: true,
        tags: true,
        exercises: { include: { exercise: true } },
        likedBy: true,
        programs: true,
      },
    });

    return NextResponse.json(newWorkout, { status: 201 });
  } catch (error) {
    console.error("Error creating workout:", error);
    return NextResponse.json(
      { error: "Failed to create workout" },
      { status: 500 }
    );
  }
});