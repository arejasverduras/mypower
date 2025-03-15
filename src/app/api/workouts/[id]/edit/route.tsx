import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../../../../../auth";
import { User } from "next-auth";


// add exercise to workout
export async function POST(
    req: NextRequest,
    context: { params: { id: string } },
  ): Promise<NextResponse> 

  {
    return auth(async (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
        authreq: any & { auth?: { user?: User } }
    ) => {
        const { id } = await context.params;
  
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
            )(req, context) as Promise<NextResponse>;
  }


  // edit metadata
export async function PATCH(req: NextRequest,context: { params: { id: string } },): Promise<Response> 

{
  return auth(async (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      authreq: any & { auth?: { user?: User } }
  ) => {
      const { id } = await context.params;

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
          authreq?.auth?.user.id === id || authreq?.auth?.user.isSuperuser;

  if (!isSelfOrSuperuser) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const { body } = await req.json();


  // 4. Update the workout
  try {
      const updatedWorkout = await prisma.workout.update({
        where: { id },
        data: {
          title: body.title,
          description: body.description
        },
        include: {
          createdBy: true,
          tags: true,
          exercises: { include: { exercise: { include: {createdBy: true}} } },
          likedBy: true,
          programs: true,
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
  ): Promise<Response> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return auth(async (authreq: any & { auth?: { user?: User } }) => {
      const { id } = await context.params;


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
      
    })(req, context) as Promise<Response>;
  }

  // export const DELETE = auth(async (req: AuthenticatedRequest, { params }: { params: { id: string } }) => {
   
  //   const { id } = await params;
    
  //   // 1. Check for authenticated user
  //   if (!req.auth?.user) {
  //     return Response.json({ error: "Not authenticated" }, { status: 401 })
  //   }
  
  //   // 2. Check if workout exists
  //   const existingWorkout = await prisma.workout.findUnique({
  //     where: { id: params.id }
  //   })
  
  //   if (!existingWorkout) {
  //     return Response.json({ error: "Workout not found" }, { status: 404 })
  //   }
  
  //   // 3. Check if user is creator or superuser
  //   const isSelfOrSuperuser = 
  //     req.auth.user.id === existingWorkout.createdById || 
  //     req.auth.user.isSuperuser
  
  //   if (!isSelfOrSuperuser) {
  //     return Response.json({ error: "Not authorized" }, { status: 403 })
  //   }
  
  //   try {
  //     // 4. Get exerciseId from request body
      
      
  //     const { exerciseId } = await req.json()
  
  //     // 5. Delete exercise from workout
  //     const updatedWorkout = await prisma.workout.update({
  //       where: { id },
  //       data: {
  //         exercises: {
  //           delete: {
  //             id: exerciseId,
  //           },
  //         },
  //       },
  //       include: {
  //         exercises: { 
  //           include: { 
  //             exercise: { 
  //               include: { 
  //                 createdBy: true 
  //               } 
  //             } 
  //           } 
  //         }
  //       },
  //     })
  
  //     return Response.json(updatedWorkout, { status: 200 })
  
  //   } catch (error) {
  //     console.error(error)
  //     return Response.json(
  //       { error: "Internal Server Error" }, 
  //       { status: 500 }
  //     )
  //   }
  // })