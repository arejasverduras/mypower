import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../../../../auth";

export async function GET(req:Request, {params}: {params: Promise<{id:string}>}) {
  const { id } = await params;

  const workoutId = id;
  
    try {
      const workout = await prisma.workout.findUnique({
          where: { id: workoutId },
          include: {
            createdBy: {
              select: {id: true, name: true, image: true},
            }
          }
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