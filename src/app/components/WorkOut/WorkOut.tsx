"use client";
import { useState } from "react";
import { WorkoutWithRelations } from "../../../types/workout";
import { WorkOutHeader } from "./WorkOutHeader/WorkOutHeader";
import { WorkOutExercises } from "./WorkOutExercises/WorkOutExercises";
import { WorkOutAddExercises } from "./WorkOutAddExercises/WorkOutAddExercises";
import { useSessionContext } from "@/context/SessionContext";
import { Error } from "../UI functions/Error/Error";


// import Head from "next/head";

interface WorkOutProps {
    workout: WorkoutWithRelations;
    view: "page" | "list";
}

export const WorkOut = ({workout, view}: WorkOutProps) => {
    const [exercises, setExercises] = useState(workout.exercises);
    const {session} = useSessionContext();
    const [error, setError] = useState("");
    // const [message, setMessage] = useState("")

    const creatorOrSuper = session?.id === workout.createdBy.id || session?.isSuperuser;

    const handleDeleteExercise = async (exerciseId: string) => {
        try {
            const res = await fetch(`/api/workouts/${workout.id}/edit`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ exerciseId }),
            });

            if (!res.ok) {
                setError('Failed to delete exercise');
                return;
            }

            const updatedWorkout = await res.json();
            setExercises(updatedWorkout.exercises);
            // setMessage(updatedWorkout.message);
        } catch (error) {
            console.error(error);
            setError('Failed to delete exercise');
        }
    };

    if (view === "page")
    return (
        <div className=" flex flex-col items-start space-y-4 max-w-5xl mx-auto">
            <WorkOutHeader workout={workout} />
            {error && <Error error={error} />}
            {/* {message && <div>{message}</div>} */}
            <WorkOutExercises workoutExercises={exercises || []} context={creatorOrSuper? "edit": "view"} onDelete={handleDeleteExercise} />
            <div className="h-4"></div>
            {creatorOrSuper && <WorkOutAddExercises exercises={exercises} setExercises={setExercises} workoutId={workout.id} />}
        </div>
    );
}
