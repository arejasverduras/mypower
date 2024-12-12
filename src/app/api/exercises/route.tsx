import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export interface ExerciseProps {
    id: number,
    title: string,
    image?: string,
    video?: string,
    description?: string,
    execution?: string,
}

const prisma = new PrismaClient();

// let exercises = [

//     {
//         id: 1,
//         title: 'Curtsy Lunge',
//         video: 'wzHjHs6jlIA?si=egKTt8NaFqiVd-DA'
//     },
//     {
//         id: 2,
//         title: 'Kettlebell Lateral Swings',
//         video: 'api9BRUZ9lM?si=gxgim0Q10pmJhuJo'
//     },
//     {
//         id: 3,
//         title: 'Banded lateral walks (Monster walks)',
//         video: 'rPTkrAJ6Fh4?si=1xLYttjECSvYrGk5'
//     },
//     {
//         id: 4,
//         title: 'Sumo deadlift',
//         video: 'nAeklcroNUw?si=GrHuuacJ7xhBwad4'
//     },
//     {
//         id: 5,
//         title: 'bulgarian split squats',
//         video: 'l246T6Zy96s?si=gvsgq0cnNsxk1zIr'
//     },
//     {
//         id: 6,
//         title: 'Bench supported glute bridge',
//         video: 'LZWQgMxryDc?si=pv3P8neCufwsb8hV'
//     }
// ];

// GET requests
export async function GET() {
    const exercises = await prisma.exercise.findMany({
        orderBy: {createdAt: "desc"}
    });
    return NextResponse.json(exercises, {status: 200});
}

// POST requests
export async function POST(req: Request) {
    const body = await req.json();

    if (!body.title) {
        return NextResponse.json({error: "Title is required"}, {status: 400});
    }

    const newExercise = await prisma.exercise.create({
        data: { 
            title: body.title,
            video: body.video || null,
            image: body.image || null,
            description: body.description || null,
            execution: body.execution || null,    
        }
    });

    return NextResponse.json(newExercise, { status: 201 });
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