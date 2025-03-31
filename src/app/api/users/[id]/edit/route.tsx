import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// import { auth } from "../../../../../../auth";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../auth";


// export async function PATCH(
//     req: NextRequest,
//     context: { params: { id: string } },
//   ): Promise<Response> 

//   {
//     return auth(async (
//         authreq: any & { auth?: { user?: User } }
//     ) => {
//         const { id } = await context.params;
  
//     // 1. checks for a logged in user
//         if (!authreq.auth?.user) {
//         return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//         }

//     //   2. check if the user exists
//     const existingUser = await prisma.user.findUnique({
//         where: { id }
//     })

//     if (!existingUser) {
//         return NextResponse.json({ error: "User not found"}, { status: 404})
//     }

//     // 3. Check if the user is the creator or a superuser
//     const isSelfOrSuperuser =
//             authreq?.auth?.user.id === id || authreq?.auth?.user.isSuperuser;

//     if (!isSelfOrSuperuser) {
//         return NextResponse.json({ error: "Not authorized" }, { status: 403 });
//     }

//     const body = await req.json();

//     // 4. Update the user
//         try {
//             const updatedUser = await prisma.user.update({
//               where: { id },
//               data: body,
//               include: {
//                 createdExercises: true,
//               }
//             });

//             if (!updatedUser) return NextResponse.json({error: "Update failed"}, { status: 400})
  
//         return NextResponse.json(updatedUser, { status: 200 });
//       } catch (error) {
//         console.error(error);
//         return NextResponse.json(
//           { error: "Internal Server Error" },
//           { status: 500 }
//         );
//       }
//     }
//             )(req, context) as Promise<Response>;
  // }
 
  export const PATCH = async (req: Request, {params}: {params: {id:string}}) => {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
  
    const { id } = params;
  
      //   2. check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
  })

  if (!existingUser) {
      return NextResponse.json({ error: "User not found"}, { status: 404})
  }

  // 3. Check if the user is the creator or a superuser
  const isSelfOrSuperuser =
          session.user.id === id || session.user.isSuperuser;

  if (!isSelfOrSuperuser) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }
  
    const body = await req.json();
  
    // 4. Update the user
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: body,
        include: {
          createdExercises: true,
        }
      });

      if (!updatedUser) return NextResponse.json({error: "Update failed"}, { status: 400})

  return NextResponse.json(updatedUser, { status: 200 });
} catch (error) {
  console.error(error);
  return NextResponse.json(
    { error: "Internal Server Error" },
    { status: 500 }
  );
}
  
  }

// export async function DELETE(
//   req: NextRequest,
//   context: { params: { id: string } },
// ): Promise<Response> 

// {
//   return auth(async (
//       authreq: any & { auth?: { user?: User } }
//   ) => {
//       const { id } = await context.params;

//   // 1. checks for a logged in user
//       if (!authreq.auth?.user) {
//       return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//       }

//   //   2. check if the user exists
//   const existingUser = await prisma.user.findUnique({
//       where: { id }
//   })

//   if (!existingUser) {
//       return NextResponse.json({ error: "User not found"}, { status: 404})
//   }

//   // 3. Check if the user is the creator or a superuser
//   const isSelfOrSuperuser =
//           authreq?.auth?.user.id === id || authreq?.auth?.user.isSuperuser;

//   if (!isSelfOrSuperuser) {
//       return NextResponse.json({ error: "Not authorized" }, { status: 403 });
//   }

//   // 4. Deletethe user
//       try {

//         await prisma.user.delete({
//           where: {id}
//         })


//       return NextResponse.json({message: "User deleted succesfully"}, { status: 200 });

//     } catch (error) {
//       console.error(error);
//       return NextResponse.json(
//         { error: "Internal Server Error" },
//         { status: 500 }
//       );
//     }
//   }
//           )(req, context) as Promise<Response>;
// }

