import { notFound } from "next/navigation";
// import { Exercise } from "@/app/components/Exercises/ExerciseList/Exercise/Exercise";
// import { Workout } from "@/app/components/Workouts/WorkoutList/Workout/Workout";

export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/workouts`);

    if (!res.ok) throw new Error("Failed to fetch workouts");

    const workouts = await res.json();

    return workouts.map((workout: {id: string}) => ({
        id: workout.id, // Convert ID's to strings
    }))
};

export default async function WorkoutPage({params}: { params: Promise<{id:string}> }) {
    const { id } = await params;

    // Fetch workout data from API
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/workouts/${id}`, {
        next: {revalidate: 10} // ISR every 10 seconds.
    });

      // Handle invalid or non-numeric IDs (400 response)
  if (res.status === 400) {
    notFound(); // Redirect to the 404 page
  }

    if (res.status === 404) {
        notFound(); // redirect to 404 page
    }

    if (!res.ok) throw new Error("Failed to fetch worktout details");

    const workout = await res.json();

    return (
        <div>
            {/* <Workout 
                view="page"
                workout={workout}
                index={workout.id}
                /> */}
                Workout components go here
        </div>
    )
};
