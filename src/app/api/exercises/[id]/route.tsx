import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req:Request, {params}: {params: {id:string}}) {
    const exerciseId = parseInt(params.id, 10);

    try {
        const exercise = await prisma.exercise.findUnique({
          where: { id: exerciseId },
        });
    
        if (!exercise) {
          return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
        }
    
        return NextResponse.json(exercise, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: "Failed to fetch exercise" }, { status: 500 });
      }
}

// PATCH (EDIT)
export async function PATCH(req:Request, {params}: {params: {id: string}}) {
    const exerciseID = parseInt(params.id, 10);
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
        return NextResponse.json({error: "Exercise not found or update failed"}, {status: 404});
    }
}

// DELETE: Remove an exercise
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const exerciseId = parseInt(params.id, 10);
    console.log(params.id);
  
    try {
      await prisma.exercise.delete({
        where: { id: exerciseId },
      });
  
      return NextResponse.json({ message: "Exercise deleted successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Exercise not found or delete failed" }, { status: 404 });
    }
  }