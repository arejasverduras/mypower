import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// import { auth } from "../../../../auth";

//  GET request

export async function GET () {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            isSuperuser: true,
            email: false,
        },
        orderBy: {createdAt: "desc"}
    });
    return NextResponse.json(users, {status: 200});
};