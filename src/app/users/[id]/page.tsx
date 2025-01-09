import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function UserProfilePage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      createdExercises: true, // Include all exercises created by this user
    },
  });

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <>
        {user.image && <Image className="rounded-r-full my-5 " src={user.image} width='100' height='100' alt="user image"/>}

        <div className="p-4">
        <h1 className="text-2xl font-bold">{user.name || "User's Profile"}</h1>
        {/* <p className="text-gray-500">Email: {user.email || "N/A"}</p> */}


        <h2 className="text-xl font-semibold mt-6">Added Exercises:</h2>
        <ul>
            {user.createdExercises.map((exercise) => (
            <li key={exercise.id} className="mt-2">
                <Link href={`/exercises/${exercise.id}`} className="text-blue-500 hover:underline">
                {exercise.title}
                </Link>
            </li>
            ))}
        </ul>
        </div>
    </>
  );
}
