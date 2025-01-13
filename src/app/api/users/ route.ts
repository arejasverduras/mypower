import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

//  GET request

export async function GET() {
  return NextResponse.json({ message: "API is working!" });
}

// export async function GET() {
//   // console.log("GET /api/users triggered");
//   // try {
//   //   const users = await prisma.exercise.findMany({
//   //     orderBy: { createdAt: "desc" },
//   //   });
//   //   return NextResponse.json(users, { status: 200 });
//   // } catch (error) {
//   //   console.error("Error fetching users:", error);
//   //   return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
//   // }
//   return NextResponse.json({ message: "API is working!" });

// }