import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req:Request, {params}: {params: Promise<{id:string}>}) {
  const { id } = await params;

  
    try {
      const workout = await prisma.workout.findUnique({
          where: { id },
          include: {
            createdBy: true,
            tags: true,
            exercises: { include: { exercise: { include: {createdBy: true}} } },
            likedBy: true,
            programs: true,
          },
        });
    
        if (!workout) {
          return NextResponse.json({ error: "Workout not found" }, { status: 404 });
        }
    
        return NextResponse.json(workout, { status: 200 });
      } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }
}