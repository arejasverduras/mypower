import Link from "next/link";
import Image from "next/image";
import { ExerciseProps } from "@/app/api/exercises/route";
import { notFound, redirect  } from "next/navigation";
import EditUserModalTest from "@/app/components/User/EditUserModalTest/EditUserModalTest";
import { BackButton } from "@/app/components/UI functions/BackButton/BackButton";
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
  return (
    <>
        <BackButton fallback="/users"/>
        <User data={user} id={id}/>
    </>
  );
}
