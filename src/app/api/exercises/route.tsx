import { NextResponse } from "next/server";

export interface ExerciseProps {
    id: number,
    title: string,
    image?: string,
    video?: string,
    description?: string,
    execution?: string,
}

let exercises = [

    {
        id: 1,
        title: 'Curtsy Lunge',
        video: 'wzHjHs6jlIA?si=egKTt8NaFqiVd-DA'
    },
    {
        id: 2,
        title: 'Kettlebell Lateral Swings',
        video: 'api9BRUZ9lM?si=gxgim0Q10pmJhuJo'
    },
    {
        id: 3,
        title: 'Banded lateral walks (Monster walks)',
        video: 'rPTkrAJ6Fh4?si=1xLYttjECSvYrGk5'
    },
    {
        id: 4,
        title: 'Sumo deadlift',
        video: 'nAeklcroNUw?si=GrHuuacJ7xhBwad4'
    },
    {
        id: 5,
        title: 'bulgarian split squats',
        video: 'l246T6Zy96s?si=gvsgq0cnNsxk1zIr'
    },
    {
        id: 6,
        title: 'Bench supported glute bridge',
        video: 'LZWQgMxryDc?si=pv3P8neCufwsb8hV'
    }
];

// GET requests
export async function GET() {
    return NextResponse.json(exercises, {status: 200});
}

// POST requests
export async function POST(req: Request) {
    const body = await req.json();
    const {title} = body;

    if (!title) {
        return NextResponse.json({error: "Missing Fields"}, {status: 400});
    }

    const newExercise = { 
        id: exercises.length + 1, 
        title,
        video: body.video ?? null,
        image: body.image ?? null,
        description: body.description ?? null,
        execution: body.execution ?? null,    
    };
    exercises.push(newExercise);

    return NextResponse.json(newExercise, { status: 201 });
}