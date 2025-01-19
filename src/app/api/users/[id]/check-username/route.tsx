import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    // Check if the username exists in the database
    const user = await prisma.user.findUnique({
      where: { name },
    });

    return NextResponse.json({ exists: !!user });
  } catch (error) {
    console.error("Error checking username availability:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
