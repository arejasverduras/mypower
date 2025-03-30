import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id: userId } = params;

  try {
    console.log("Fetching user with ID:", userId); // Debugging

    // Attempt to get the session, but allow unauthenticated access
    const session = await getServerSession(authOptions);
    console.log("Session:", session); // Debugging

    // Determine if the user is a superuser or requesting their own profile
    const isSelfOrSuperuser =
      session?.user?.id === userId || session?.user?.isSuperuser;

    // Fetch the user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: isSelfOrSuperuser
        ? undefined // Full data for superusers or own profile
        : {
            id: true,
            name: true,
            image: true,
            bio: true,
            quote: true,
            createdAt: true,
            createdExercises: true,
          }, // Limited data for others
    });

    console.log("Fetched user:", user); // Debugging

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("GET User Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}