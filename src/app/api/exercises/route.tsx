
// import { getAuthSession } from "../../../../auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET and Search
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.toLowerCase() || "";

    console.log("Server search:", search);

    const exercises = await prisma.exercise.findMany({
      where: {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
          { tags: { some: { name: { contains: search} } } },
          { createdBy: { name: { contains: search } } },
          { workouts: { some: { workout: { title: { contains: search } } } } },
        ],
      },
      include: {
        createdBy: true,
        tags: true,
        workouts: { include: { workout: true } },
        likedBy: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(exercises, { status: 200 });
  } catch (error) {
    console.error("Server: Error fetching exercises:", error);
    return NextResponse.json({ error: "Server: Failed to fetch exercises" }, { status: 500 });
  }
}


// // POST requests
// export const POST = auth(async function POST(req: Request) {
//     const body = await req.json(); 
//     // const session = await auth();

//     if (!req.auth) {
//         return NextResponse.json({ error: "Not authenticated to POST exercise" }, { status: 401 });
//       }
  
//     if (!body.title) {
//       return NextResponse.json({ error: "Title is required" }, { status: 400 });
//     }
  
//     try {
//       const newExercise = await prisma.exercise.create({
//         data: {
//           title: body.title,
//           video: body.video || null,
//           image: body.image || null,
//           description: body.description || null,
//           execution: body.execution || null,
//           createdBy: { connect: { id: req.auth?.user?.id } }, // Always connect to the user
//         },
//       });
  
//       return NextResponse.json(newExercise, { status: 201 });
//     } catch (error) {
//       console.error("Error creating exercise:", error);
//       return NextResponse.json(
//         { error: "Failed to create exercise" },
//         { status: 500 }
//       );
//     }
//   }) as NextAuthAPIRouteHandler;
  
