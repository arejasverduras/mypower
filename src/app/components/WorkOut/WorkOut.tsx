"use client";
import { useState } from "react";
import { WorkoutWithRelations } from "../../../types/workout";
import { WorkOutHeader } from "./WorkOutHeader/WorkOutHeader";
import { WorkOutExercises } from "./WorkOutExercises/WorkOutExercises";
import { WorkOutAddExercises } from "./WorkOutAddExercises/WorkOutAddExercises";
import { useSessionContext } from "@/context/SessionContext";
import { useMessageContext } from "@/context/MessageContext";
import SignInButton from "../SignInButton/SignInButton";
import { LoadingSpinner } from "../UI functions/LoadingSpinner/LoadingSpinner";


// import Head from "next/head";

interface WorkOutProps {
    workout: WorkoutWithRelations;
    view: "page" | "list";
}

export const WorkOut = ({workout, view}: WorkOutProps) => {
    const [exercises, setExercises] = useState(workout.exercises);
    const {session, sessionLoading} = useSessionContext();
    const { addMessage,  setApiLoading, clearMessages } = useMessageContext();

    const creatorOrSuper = session?.user?.id === workout.createdBy.id || session?.user?.isSuperuser;

    const handleDeleteExercise = async (exerciseId: string) => {
        clearMessages();
        setApiLoading(true);
        
        try {
            const res = await fetch(`/api/workouts/${workout.id}/edit`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ exerciseId }),
            });

            if (!res.ok) {
                addMessage({type: "error", text: "Failed to remove exercise from workout"});
                return;
            }

            const updatedWorkout = await res.json();
            setExercises(updatedWorkout.exercises);
            addMessage({type: "success", text: "Exercise removed successfully from workout"});
        } catch (error) {
            console.error(error);
            addMessage({type: "error", text: "Failed to remove exercise from workout"});

        } finally {
            setApiLoading(false);
        }
    };

    if (view === "page")
    return (
        <div className=" flex flex-col items-start space-y-4 max-w-5xl mx-auto">
            <WorkOutHeader workout={workout} />
            <WorkOutExercises workoutExercises={exercises || []} context={creatorOrSuper? "edit": "view"} onDelete={handleDeleteExercise} />
            <div className="h-4"></div>
            
            {sessionLoading && <LoadingSpinner />}
            {!sessionLoading && creatorOrSuper ? 
                <WorkOutAddExercises exercises={exercises} setExercises={setExercises} workoutId={workout.id} /> 
                : <div className="flex flex-col space-y-8 bg-midnightblue text-white p-4 rounded-lg shadow-md w-full">
                    Sign-in to add exercises <SignInButton />
                </div>}
        </div>
    );
}
