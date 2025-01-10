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

// PATCH (EDIT)
export async function PATCH(req:Request, {params}: {params: Promise<{id:string}>}) {
  const { id } = await params;  
  const exerciseID = id;
    const body = await req.json();

    // const session = await auth(req);



    try {
        const updatedExercise = await prisma.exercise.update({
            where: {id: exerciseID}, 
            data: { 
                title: body.title,
                video: body.video || null,
                image: body.image || null,
                description: body.description || null,
                execution: body.execution || null,    
            }
        })
        return NextResponse.json(updatedExercise, { status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Exercise not found or update failed"}, {status: 404});
    }
}

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
