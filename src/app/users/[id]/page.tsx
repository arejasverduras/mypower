import Link from "next/link";
import Image from "next/image";
import { ExerciseProps } from "@/app/api/exercises/route";
import { notFound, redirect  } from "next/navigation";
import EditUserModalTest from "@/app/components/User/EditUserModalTest/EditUserModalTest";
import { BackButton } from "@/app/components/BackButton/BackButton";
import { User } from "@/app/components/User/User";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);

  if (!res.ok) throw new Error("Failed to fetch users");

  const users = await res.json();

  return users.users.map((user: {id: string}) => ({
      id: user.id, // Convert ID's to strings
  }))
};

export default async function UserProfilePage({ params }: { params: Promise<{id: string}>}) {

  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`, {next: {revalidate: 10}});
      // Handle invalid or non-numeric IDs (400 response)
      if (res.status === 400) {
        notFound(); // Redirect to the 404 page
      }
    
        if (res.status === 404) {
            notFound(); // redirect to 404 page
        }
    
        if (!res.ok) throw new Error("Failed to fetch user details");
    
        const user = await res.json();

  if (!user) {
    return <p>User not found</p>;
  }
  // create <User/> component, so in it useSession can be called to conditionally render UI functions (edit / delete)
  return (
    <>
        <BackButton fallback="/users"/>
        <User userData={user} id={id}/>
        {/* {user.image && <Image className="rounded-r-full my-5 " src={user.image} width='100' height='100' alt="user image"/>} */}
        {/* <EditUserModalTest userId={id}/>
        <div className="p-4">
        <h1 className="text-2xl font-bold">{user.name || "User's Profile"}</h1>
        <h2 className="text-xl font-semibold mt-6">Added Exercises:</h2>
        <ul>
            {user.createdExercises.map((exercise: ExerciseProps) => (
            <li key={exercise.id} className="mt-2">
                <Link href={`/exercises/${exercise.id}`} className="text-blue-500 hover:underline">
                {exercise.title}
                </Link>
            </li>
            ))}
        </ul>
        </div> */}
    </>
  );
}
