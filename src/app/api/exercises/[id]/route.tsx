// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../../../../auth";

// const prisma = new PrismaClient();

export async function GET(req:Request, {params}: {params: Promise<{id:string}>}) {
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
}


export const PATCH = auth(async function PATCH(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Await params because it's now a Promise
  const body = await req.json();

  console.log("Session object in API route:", req.auth); // Log the session object


  // Ensure the user is authenticated
  if (!req.auth) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    // Fetch the exercise to check ownership
    const exercise = await prisma.exercise.findUnique({
      where: { id },
      select: { createdById: true },
    });

    if (!exercise) {
      return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
    }

    // Check if the user is the creator or a superuser
    if (exercise.createdById !== req.auth.user.id && !req.auth.user.isSuperuser) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    // Update the exercise
    const updatedExercise = await prisma.exercise.update({
      where: { id },
      data: {
        title: body.title || undefined,
        video: body.video || undefined,
        image: body.image || undefined,
        description: body.description || undefined,
        execution: body.execution || undefined,
      },
    });

    return NextResponse.json(updatedExercise, { status: 200 });
  } catch (error) {
    console.error("Error updating exercise:", error);
    return NextResponse.json({ error: "Failed to update exercise" }, { status: 500 });
  }
});


// DELETE: Remove an exercise
export const DELETE = auth( async function DELETE(req, { params }: {params: Promise<{id:string}>}) {
  const { id } = await params;  
  const exerciseId = id;
   
    // Ensure the user is authenticated
    if (!req.auth) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
  
    try {
      // Fetch the exercise to check ownership
      const exercise = await prisma.exercise.findUnique({
          where: { id },
          select: { createdById: true },
        });

        if (!exercise) {
          return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
        }

        // Check if the user is the creator or a superuser
      if (exercise.createdById !== req.auth.user.id && !req.auth.user.isSuperuser) {
        return NextResponse.json({ error: "Not authorized" }, { status: 403 });
      }



      await prisma.exercise.delete({
        where: { id: exerciseId },
      });
  
      return NextResponse.json({ message: "Exercise deleted successfully" }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Failed to delete exercise" }, { status: 500 });
    }
  })
