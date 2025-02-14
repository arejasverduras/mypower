// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../../../auth";


// GET requests
export async function GET() {
    const exercises = await prisma.exercise.findMany({
      include: {
        createdBy: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(exercises, {status: 200});
}

// POST requests
export const POST = auth(async function POST(req: Request) {
    const body = await req.json(); 
    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Not authenticated to POST exercise" }, { status: 401 });
      }
  
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
  
    try {
      const newExercise = await prisma.exercise.create({
        data: {
          title: body.title,
          video: body.video || null,
          image: body.image || null,
          description: body.description || null,
          execution: body.execution || null,
          createdBy: { connect: { id: session?.user?.id } }, // Always connect to the user
        },
      });
  
      return NextResponse.json(newExercise, { status: 201 });
    } catch (error) {
      console.error("Error creating exercise:", error);
      return NextResponse.json(
        { error: "Failed to create exercise" },
        { status: 500 }
      );
    }
  });
  
