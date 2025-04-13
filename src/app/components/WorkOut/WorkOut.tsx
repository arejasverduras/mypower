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
import { editWorkoutExerciseMeta } from "@/lib/api";


// import Head from "next/head";

interface WorkOutProps {
    workout: WorkoutWithRelations;
    view: "page" | "list";
}

export const WorkOut = ({ workout, view }: WorkOutProps) => {
    const [currentWorkout, setWorkout] = useState(workout); // Manage workout state
    const exercises = currentWorkout.exercises || [];
    const { session, sessionLoading } = useSessionContext();
    const { addMessage, setApiLoading, clearMessages } = useMessageContext();

    const creatorOrSuper = session?.user?.id === workout.createdBy.id || session?.user?.isSuperuser;

    // updates workout state after changing title, description and tags in the Header
    const handleUpdateWorkout = (updatedWorkout: WorkoutWithRelations) => {
        setWorkout(updatedWorkout); 
    };


// // API call to edit workout exercise metadata: custom reps, sets, description
      const handleEditExerciseMeta = async (
        exerciseId: string,
        metadata: {
          customRepetitions: string | null;
          customSets: number | null;
          customDescription: string | null;
        }
      ) => {
        clearMessages();
        setApiLoading(true);
      
        try {
          // Call the API to update the exercise metadata
          const updatedWorkout = await editWorkoutExerciseMeta(workout.id, exerciseId, metadata);
      
          // Update the workout state with the new data
          setWorkout(updatedWorkout);
      
          addMessage({ type: "success", text: "Exercise metadata updated successfully" });
        } catch (error) {
          console.error(error);
          addMessage({ type: "error", text: "Failed to update exercise metadata" });
        } finally {
          setApiLoading(false);
        }
      };

    const handleDeleteExercise = async (exerciseId: string) => {
        clearMessages();
        setApiLoading(true);

        try {
            const res = await fetch(`/api/workouts/${workout.id}/edit`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ exerciseId }),
            });

            if (!res.ok) {
                addMessage({ type: "error", text: "Failed to remove exercise from workout" });
                return;
            }

            const updatedWorkout = await res.json();
            setWorkout(updatedWorkout); // Update currentWorkout with the new data
            addMessage({ type: "success", text: "Exercise removed successfully from workout" });
        } catch (error) {
            console.error(error);
            addMessage({ type: "error", text: "Failed to remove exercise from workout" });
        } finally {
            setApiLoading(false);
        }
    };

    if (view === "page")
        return (
            <div className="flex flex-col items-start space-y-4 max-w-5xl mx-auto">
                <WorkOutHeader
                    workout={currentWorkout}
                    context="page"
                    onUpdate={handleUpdateWorkout} // Pass update callback
                />
                <WorkOutExercises
                    workoutExercises={exercises || []}
                    context={creatorOrSuper ? "edit" : "view"}
                    onDelete={handleDeleteExercise}
                    onEditExerciseMeta={handleEditExerciseMeta} // Pass API call function
    
                />
                <div className="h-4"></div>

                {sessionLoading && <LoadingSpinner />}
                {!sessionLoading && creatorOrSuper ? (
                    <WorkOutAddExercises 
                        exercises={exercises} 
                        workoutId={workout.id}
                        onUpdate={handleUpdateWorkout} // Pass update callback
                        />

                ) : (
                    <div className="flex flex-col space-y-8 bg-midnightblue text-white p-4 rounded-lg shadow-md w-full">
                        Sign-in to add exercises <SignInButton />
                    </div>
                )}
            </div>
        );
};