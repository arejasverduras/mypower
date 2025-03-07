import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../../../../../auth";
import { User } from "next-auth";

// add exercise to workout
export async function POST(
    req: NextRequest,
    context: { params: { id: string } },
  ): Promise<Response> 

  {
    return auth(async (
        authreq: any & { auth?: { user?: User } }
    ) => {
        const { id } = context.params;
  
    // 1. checks for a logged in user
        if (!authreq.auth?.user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

    //   2. check if the user exists / workout
    const existingWorkout = await prisma.workout.findUnique({
        where: { id }
    })

    if (!existingWorkout) {
        return NextResponse.json({ error: "Workout not found"}, { status: 404})
    }

    // 3. Check if the user is the creator or a superuser
    const isSelfOrSuperuser =
            authreq?.auth?.user.id === id || authreq?.auth?.user.isSuperuser;

    if (!isSelfOrSuperuser) {
        return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const { exerciseId } = await req.json();


    // 4. Update the workout
    try {
        const updatedWorkout = await prisma.workout.update({
          where: { id },
          data: {
            exercises: {
              create: {
                exerciseId,
              },
            },
          },
          include: {
            exercises: { include: { exercise: { include: {createdBy: true}} } }
          },
        });
    
        return NextResponse.json(updatedWorkout, { status: 200 });
      } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }
    }
            )(req, context) as Promise<Response>;
  }
 
  export async function DELETE(
    req: NextRequest,
    context: { params: { id: string } },
  ): Promise<Response> 

  {
    return auth(async (
        authreq: any & { auth?: { user?: User } }
    ) => {
        const { id } = context.params;

    // 1. checks for a logged in user
        if (!authreq.auth?.user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

    //   2. check if the workout exists
    const existingWorkout = await prisma.workout.findUnique({
        where: { id }
    })

    if (!existingWorkout) {
        return NextResponse.json({ error: "Workout not found"}, { status: 404})
    }

    // 3. Check if the user is the creator or a superuser
    const isSelfOrSuperuser =
            authreq?.auth?.user.id === existingWorkout.createdById || authreq?.auth?.user.isSuperuser;

    if (!isSelfOrSuperuser) {
        return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const { exerciseId } = await req.json();

    // 4. Delete the exercise from the workout
        try {
          const updatedWorkout = 
          await prisma.workout.update({
            where: { id },
            data: {
              exercises: {
                delete: {
                  id: exerciseId,
                },
              },
            },
            include: {
              exercises: { include: { exercise: { include: { createdBy: true } } } }
          },

          });

          // updatedWorkout.message = "Exercise deleted";

          return NextResponse.json(updatedWorkout, { status: 200 });

      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }
    }
            )(req, context) as Promise<Response>;
  }