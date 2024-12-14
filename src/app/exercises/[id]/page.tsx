'use client'
import { useState, useEffect } from "react";
import EditExerciseModal from "@/app/components/ExerciseList/EditExerciseModal/EditExerciseModal";
import { ExerciseProps } from "@/app/api/exercises/route";
import { YouTube } from "@/app/components/Video/YouTube/YouTube";

export default function ExercisePage ({params}: {params: {id: string}}) {
    const [exercise, setExercise] = useState<ExerciseProps | null>(null);
    const [loading, setLoading] = useState(true);

    const exerciseId = parseInt(params.id, 10);
    // fetch exercise from api/exercise/[id]
    useEffect(()=>{
        const fetchExercise = async () => {
            try {
                const res = await fetch(`/api/exercises/${exerciseId}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch exercise details")
                }
                const data = await res.json();
                setExercise(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }    
        }
          fetchExercise();  
    },[]) //empty or 

    if (loading) return <div>Loading...</div>; // Show loading state

    if (!exercise) return <div>No exercise found</div>; // Show when no exercise is available

    return (
        <div className="bg-midnight">
            <h1>{exercise.title}</h1>
            {exercise.video && <YouTube embedId={exercise.video}/>}
            {exercise.description && <div className="p-5">{exercise.description}</div>}
            {exercise.execution && (<div className="p-5"><h5 className="font-bold">Execution</h5> <div>{exercise.execution}</div> </div>)}
        </div>
    )
}