import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../../../../auth";

export const GET = auth(async function GET (req: Request, {params}: {params: Promise<{id:string}>}) {
    // wrapping in auth populates the req.auth object
    const { id } = await params;


    if (!req.auth) return NextResponse.json({error: "Not authorized"}, {status: 401})

    // full access to data for superusers or the requesting' users own data
    if (req.auth.user.id === id || req.auth.user.isSuperuser){
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: id
                }
            })
    
            if (!user) return NextResponse.json({error: "User not found"}, {status: 404})
    
            return NextResponse.json(user, {status: 200})
    
        } catch (error) {
            console.log(error);
            return NextResponse.json({error: "Internal Server Error"}, {status: 500})
        }
    }

    // regular authenticated users don't see sensitive information
    try {
        const user = await prisma.user.findUnique({
            select: {
                id: true,
                name: true,
                image: true,
                isSuperuser: true, // security risk?
                createdAt: true,
                updatedAt: true,
            },
            where: {
                id: id
            }
        })

        if (!user) return NextResponse.json({error: "User not found"}, {status: 404})

        return NextResponse.json(user, {status: 200})

    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
});
