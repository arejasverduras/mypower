"use client";
import { WorkoutWithRelations } from "../../../../types/workout";
import { WorkOutHeader } from "./WorkOutHeader/WorkOutHeader";
import { WorkOutExercises } from "./WorkOutExercises/WorkOutExercises";
// import Head from "next/head";

interface WorkOutProps {
    workout: WorkoutWithRelations;
    view: "page" | "list";
}

export const WorkOut = ({workout, view}: WorkOutProps) => {
    console.log (workout, view);
    return (
        <div className=" flex flex-col items-start space-y-4 max-w-5xl mx-auto">
            <WorkOutHeader workout={workout} />
            <WorkOutExercises workoutExercises={workout.exercises || []} />
        </div>
    );
}
