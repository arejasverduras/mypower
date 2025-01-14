import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../../../../auth";
import { Session, User } from "next-auth";

declare global {
    interface Request {
      auth?: Session | null;
    }
  }

  export async function GET(
    req: NextRequest,
    context: { params: { id: string } },
  ): Promise<Response> 
  
  {
    return auth(async (
        authreq: any & { auth?: { user?: User } }
    ) => {
          
        console.log('ID:', context?.params?.id);
  
        // 1. checks for a logged in user
        if (!authreq?.auth?.user) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          {
            status: 401,
            statusText: 'You must be logged in to perform this action',
          },
        );
      }
        
        const { id} = context.params;

        //   2. Full data: User requests own data or superuser request?
        if (authreq.auth.user.id === id || authreq.auth.user.isSuperuser) {
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

        // 3. User request another users data and is not a superuser : partial data
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
    }
            )(req, context) as Promise<Response>;
  }


  // export const GET = auth(async function GET (
//     req: NextRequest, 
//     // ctx: {params: Promise<{id:string}>}
//     context: { params: Promise<{ id: string }> } // Explicitly declare `params` as a Promise

// ) {
//     // wrapping in auth populates the req.auth object
   
//     const { id } = await params;


//     if (!req.auth) return NextResponse.json({error: "Not authorized"}, {status: 401})

//     // full access to data for superusers or the requesting' users own data
//     if (req.auth.user.id === id || req.auth.user.isSuperuser){
//         try {
//             const user = await prisma.user.findUnique({
//                 where: {
//                     id: id
//                 }
//             })
    
//             if (!user) return NextResponse.json({error: "User not found"}, {status: 404})
    
//             return NextResponse.json(user, {status: 200})
    
//         } catch (error) {
//             console.log(error);
//             return NextResponse.json({error: "Internal Server Error"}, {status: 500})
//         }
//     }

//     // regular authenticated users don't see sensitive information
//     try {
//         const user = await prisma.user.findUnique({
//             select: {
//                 id: true,
//                 name: true,
//                 image: true,
//                 isSuperuser: true, // security risk?
//                 createdAt: true,
//                 updatedAt: true,
//             },
//             where: {
//                 id: id
//             }
//         })

//         if (!user) return NextResponse.json({error: "User not found"}, {status: 404})

//         return NextResponse.json(user, {status: 200})

//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({error: "Internal Server Error"}, {status: 500})
//     }
// });
