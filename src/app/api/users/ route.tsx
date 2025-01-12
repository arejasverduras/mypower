import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//  GET request

export async function GET() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            isSuperuser: true,
        },
        orderBy: {createdAt: "desc"}
    });
    return NextResponse.json(users, {status: 200});
};