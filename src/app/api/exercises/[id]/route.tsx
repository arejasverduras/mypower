/* eslint-disable @typescript-eslint/no-explicit-any */
import {  NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../auth";


export async function GET(
  req: Request,
  { params }: { params: { id: string } } 
) {
  const { id: exerciseId } = params;

  try {
    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId },
      include: {
        createdBy: {
          select: { id: true, name: true, image: true },
        },
      },
    });

    if (!exercise) {
      return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
    }

    return NextResponse.json(exercise, { status: 200 });
  } catch (error) {
    console.error("GET Exercise Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export const PATCH = async (req: Request, {params}: {params: {id:string}}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = params;

      // 2. Fetch the exercise to check ownership
    const exercise = await prisma.exercise.findUnique({
      where: { id },
      select: { createdById: true },
    });

    if (!exercise) {
      return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
    }

  if (session.user.id !== exercise.createdById && !session.user.isSuperuser ) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const body = await req.json();

      // 4. Update the exercise
    try {
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

}

export const DELETE = async (req: Request, {params}: {params: {id:string}}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = params;

      // 2. Fetch the exercise to check ownership
    const exercise = await prisma.exercise.findUnique({
      where: { id },
      select: { createdById: true },
    });

    if (!exercise) {
      return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
    }

  if (session.user.id !== exercise.createdById && !session.user.isSuperuser ) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

    // 4. Delete the exercise
    try {
      await prisma.exercise.delete({
        where: { id },
      });

      return NextResponse.json({ message: "Exercise deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting exercise:", error);
      return NextResponse.json({ error: "Failed to delete exercise" }, { status: 500 });
    }
};
