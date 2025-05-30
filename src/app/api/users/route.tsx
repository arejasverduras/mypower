import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "../../../../auth";
import prisma from "@/lib/prisma";

export const GET = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.toLowerCase() || "";

    const isSuperuser = session?.user?.isSuperuser;

    const whereClause = search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
            { bio: { contains: search } },
            { quote: { contains: search } },
          ],
        }
      : {};

    const users = await prisma.user.findMany({
      where: whereClause,
      select: isSuperuser
        ? undefined // Superusers can access all fields
        : {
            id: true,
            name: true,
            image: true,
            bio: true,
            quote: true,
            createdAt: true,
          }, // Regular users get limited fields
      orderBy: { createdAt: "desc" },
    });

    // Wrap the users array in an object with a `users` key
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};