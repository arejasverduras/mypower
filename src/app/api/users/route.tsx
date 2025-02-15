import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@/lib/prisma";

export const GET = auth(async (req) => {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search')?.toLowerCase() || '';

  try {
    const isSuperuser = req.auth?.user.isSuperuser;

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

    return NextResponse.json({users}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});

