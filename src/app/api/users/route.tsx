import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET () {
    try {
        const users = await prisma.user.findMany({
            orderBy: {createdAt: "desc"}
        })

        if (!users) return NextResponse.json({error: "No users found"}, {status: 404});

        return NextResponse.json({ users }, {status: 200})
    } catch (error) {
        // console.log(error)
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
};
