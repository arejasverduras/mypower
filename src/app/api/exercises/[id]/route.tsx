// import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// const prisma = new PrismaClient();

export async function GET(req:Request, {params}: {params: Promise<{id:string}>}) {
  const { id } = await params;

  const exerciseId = id;
  
  // const exerciseId = parseInt(id, 10);  
  // if (isNaN(exerciseId) || exerciseId <=0) {
  //   return NextResponse.json({ error: "Invalid exercise Id"}, {status: 400})
  // }
  
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
export async function DELETE(req: Request, { params }: {params: Promise<{id:string}>}) {
  const { id } = await params;  
  const exerciseId = id;
    
  
    try {
      await prisma.exercise.delete({
        where: { id: exerciseId },
      });
  
      return NextResponse.json({ message: "Exercise deleted successfully" }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Exercise not found or delete failed" }, { status: 404 });
    }
  }