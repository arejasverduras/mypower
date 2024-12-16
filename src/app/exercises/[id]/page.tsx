
import Image from "next/image";
import { YouTube } from "@/app/components/Video/YouTube/YouTube";

export async function generateStaticParams() {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/exercises`);
    const res = await fetch(`/api/exercises`);
    if (!res.ok) throw new Error("Failed to fetch exercises");

    const exercises = await res.json();

    return exercises.map((exercise: {id: number}) => ({
        id: exercise.id.toString(), // Convert ID's to strings
    }))
};

export default async function ExercisePage({params}: { params: {id:string} }) {
    // Fetch exercise data from API
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/exercises/${params.id}`);
    const res = await fetch(`/api/exercises/${params.id}`);

    if (!res.ok) throw new Error("Failed to fetch exercise details");

    const exercise = await res.json();

    return (
        <div>
            <h1 className="text-2xl">{exercise.title}</h1>
            <div className="">
                   {exercise.image && <Image 
                        src={exercise.image} 
                        alt={exercise.title} 
                        width="1600" 
                        height="900"
                    />}
                    {exercise.video && <YouTube embedId={exercise.video}/>}
                    {exercise.description && <div className="p-5">{exercise.description}</div>}
                    {exercise.execution && 
                       (<div className="p-5"><h5 className="font-bold">Execution</h5> <div>{exercise.execution}</div> </div>)
                        }
                </div>)
        </div>
    )
}