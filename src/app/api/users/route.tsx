import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@/lib/prisma";

export const GET = auth(async (req) => {
  // if (!req.auth?.user) {
  //   return NextResponse.json(
  //     { error: "Unauthorized" },
  //     { status: 401, statusText: "You must be logged in to perform this action" }
  //   );
  // }

  try {
    const isSuperuser = req.auth?.user.isSuperuser;

    const users = await prisma.user.findMany({
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

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});

