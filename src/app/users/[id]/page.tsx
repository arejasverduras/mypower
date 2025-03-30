import { notFound } from "next/navigation";
import { BackButton } from "@/app/components/UI functions/BackButton/BackButton";
import { User } from "@/app/components/User/User";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);

  if (!res.ok) throw new Error("Failed to fetch users");

  const data = await res.json();

  return data.users.map((user: { id: string }) => ({
    id: user.id,
  }));
}

export default async function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`,
      { next: { revalidate: 10 } }
    );

    if (res.status === 404) {
      notFound(); // Redirect to the 404 page
    }

    if (!res.ok) {
      throw new Error("Failed to fetch user details");
    }

    const user = await res.json();

    if (!user) {
      return <p>User not found</p>;
    }

    return (
      <>
        <BackButton fallback="/users" />
        <User data={user} id={id} />
      </>
    );
  } catch (error) {
    console.error("Error fetching user details:", error);
    notFound(); // Redirect to the 404 page
  }
}