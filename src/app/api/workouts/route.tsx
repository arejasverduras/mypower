import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../auth";
import prisma from "@/lib/prisma";


// GET requests
export async function GET(req: Request) {

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.toLowerCase() || ''; 
    
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
      { error: "Server: Failed to fetch workouts" },
      { status: 500 }
    );
  }
}



export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated to POST workout" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    console.log("Creating workout with data:", body);

    const newWorkout = await prisma.workout.create({
      data: {
        title: body.title,
        description: body.description || null,
        isPublic: body.isPublic ?? true, // ✅ Defaults to true if not provided
        createdBy: { connect: { id: session.user.id } },
      },
      include: {
        createdBy: true,
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
}


