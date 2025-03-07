"use client";
import { useState } from "react";
import { WorkoutWithRelations } from "../../../../types/workout";
import { WorkOutHeader } from "./WorkOutHeader/WorkOutHeader";
import { WorkOutExercises } from "./WorkOutExercises/WorkOutExercises";
import { WorkOutAddExercises } from "./WorkOutAddExercises/WorkOutAddExercises";
import { useSession } from "@/context/SessionContext";


// import Head from "next/head";

interface WorkOutProps {
    workout: WorkoutWithRelations;
    view: "page" | "list";
}

export const WorkOut = ({workout, view}: WorkOutProps) => {
    const [exercises, setExercises] = useState(workout.exercises);
    const session = useSession();

    const creatorOrSuper = session?.session?.id === workout.createdBy.id || session?.session?.isSuperuser;


    if (view === "page")
    return (
        <div className=" flex flex-col items-start space-y-4 max-w-5xl mx-auto">
            <WorkOutHeader workout={workout} />
            
            <WorkOutExercises workoutExercises={exercises || []} context={creatorOrSuper? "edit": "view"} />
            <div className="h-4"></div>
            {creatorOrSuper && <WorkOutAddExercises exercises={exercises} setExercises={setExercises} workoutId={workout.id} />}
        </div>
    );
}
