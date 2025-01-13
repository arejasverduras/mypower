import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../../../../auth";
import type { AppRouteHandlerFn, AppRouteRouteHandlerContext } from "next/dist/server/route-modules/app-route/module";
import { Session } from "next-auth";
import type { PagesRouteHandlerContext } from "next/dist/server/route-modules/pages/module.compiled";

// declare global {
//     interface Request {
//         auth?: {
//             user: {
//                 id: string,
//                 isSuperuser: boolean,
//             }
//         }
//     }
// }

declare global {
    interface Request {
      auth?: Session | null;
    }
  }



export const GET = auth(async function GET (
    req: Request, 
    // ctx: {params: Promise<{id:string}>}
    ctx: AppRouteHandlerFn
) {
    // wrapping in auth populates the req.auth object
    const params = await ctx.params;
    const { id } = params as { id: string}


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
