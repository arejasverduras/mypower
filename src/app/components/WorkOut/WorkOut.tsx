"use client";
import { useEffect } from "react";
import { WorkoutWithRelations } from "../../../types/workout";
import { WorkOutHeader } from "./WorkOutHeader/WorkOutHeader";
import { WorkOutExercises } from "./WorkOutExercises/WorkOutExercises";
import { WorkOutAddExercises } from "./WorkOutAddExercises/WorkOutAddExercises";
import { useSessionContext } from "@/context/SessionContext";
import SignInButton from "../SignInButton/SignInButton";
import { LoadingSpinner } from "../UI functions/LoadingSpinner/LoadingSpinner";
import { useWorkoutStore } from "@/app/stores/workoutStore";


// import Head from "next/head";

interface WorkOutProps {
    workout: WorkoutWithRelations;
    view: "page" | "list";
}

export const WorkOut = ({ workout, view }: WorkOutProps) => {
    const {currentWorkout, setWorkout, updateWorkout, editExerciseMeta, reorderExercises, deleteExercise } = useWorkoutStore(); // Manage workout state
    const { session, sessionLoading } = useSessionContext();


    const creatorOrSuper = session?.user?.id === workout.createdBy.id || session?.user?.isSuperuser;

  // initialize zustand store with the workout prop
  useEffect(() => {
    if (!currentWorkout) {
        setWorkout(workout); // Initialize Zustand state only if it's not already set
    } 
    else if (currentWorkout.id !== workout.id) {
        setWorkout(workout); // Update Zustand state if the workout prop changes
    }
}, [currentWorkout, workout, setWorkout]);

    // updates workout state after changing title, description and tags in the Header
    const handleUpdateWorkout =  (updatedWorkout: WorkoutWithRelations) => {
        // setWorkout(updatedWorkout); 
         updateWorkout(updatedWorkout); // Call the API to update the workout
    };

    // API call to edit workout exercise metadata: custom reps, sets, description
      const handleEditExerciseMeta = async (
        exerciseId: string,
        metadata: {
          customRepetitions: string | null;
          customSets: number | null;
          customDescription: string | null;
          customBreak: string | null;
          customExecution: string | null;
          customRest: string | null;
        }
      ) => {
        await editExerciseMeta(workout.id, exerciseId, metadata);
      };


      const handleReorderExercises = async (newOrder: string[]) => {
          await reorderExercises(workout.id, newOrder);
      };


      const handleDeleteExercise = async (exerciseId: string) => {
          await deleteExercise(workout.id, exerciseId);
      };


    if (!currentWorkout) {
      return (<LoadingSpinner />);
  }
    if (view === "page")
        return (
            <div className="flex flex-col items-start space-y-4 max-w-5xl mx-auto">
                <WorkOutHeader
                    workout={currentWorkout}
                    context="page"
                    onUpdate={handleUpdateWorkout} // Pass update callback
                />
                <WorkOutExercises
                    workoutExercises={currentWorkout?.exercises || []}
                    context={creatorOrSuper ? "edit" : "view"}
                    onDelete={handleDeleteExercise}
                    onEditExerciseMeta={handleEditExerciseMeta} 
                    onReorder={handleReorderExercises} 
                />
                <div className="h-4"></div>

                {sessionLoading && <LoadingSpinner />}
                {!sessionLoading && creatorOrSuper ? (
                    <WorkOutAddExercises 
                        workoutId={workout.id}// Pass update callback
                        />

                ) : (
                    <div className="flex flex-col space-y-8 bg-midnightblue text-white p-4 rounded-lg shadow-md w-full">
                        Sign-in to add exercises <SignInButton />
                    </div>
                )}
            </div>
        );
};