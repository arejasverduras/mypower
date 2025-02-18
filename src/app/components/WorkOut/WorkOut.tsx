"use client";
import { WorkoutWithRelations } from "../../../../types/workout";
import { WorkOutHeader } from "./WorkOutHeader/WorkOutHeader";
// import Head from "next/head";

interface WorkOutProps {
    workout: WorkoutWithRelations;
    view: "page" | "list";
}

export const WorkOut = ({workout, view}: WorkOutProps) => {
    console.log (workout, view);
    return (
        <>
        {/* <Head>
            <title>{workout.title}</title>
        </Head> */}
        <div className="p-6">

            <WorkOutHeader workout={workout} />
        </div>

        </>
    );
}