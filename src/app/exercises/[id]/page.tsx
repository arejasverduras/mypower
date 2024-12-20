import { notFound } from "next/navigation";
import { Exercise } from "@/app/components/ExerciseList/ExerciseListItems/Exercise/Exercise";

export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/exercises`);

    if (!res.ok) throw new Error("Failed to fetch exercises");

    const exercises = await res.json();

    return exercises.map((exercise: {id: number}) => ({
        id: exercise.id.toString(), // Convert ID's to strings
    }))
};

export default async function ExercisePage({params}: { params: Promise<{id:string}> }) {
    const { id } = await params;
    
    // Fetch exercise data from API
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/exercises/${id}`, {
        next: {revalidate: 10} // ISR every 10 seconds.
    });

      // Handle invalid or non-numeric IDs (400 response)
  if (res.status === 400) {
    notFound(); // Redirect to the 404 page
  }

    if (res.status === 404) {
        notFound(); // redirect to 404 page
    }

    if (!res.ok) throw new Error("Failed to fetch exercise details");

    const exercise = await res.json();

    return (
        <div>
            <Exercise 
                view="page" 
                exercise={exercise}
                index={exercise.id}
                />
        </div>
    )
};
