"use client";
import Link from "next/link";

interface WorkOutProps {
    workout: WorkoutWithRelations;
    view: "page | list";
}

export const WorkOut = ({workout, view}: WorkOutProps) => {
    console.log (workout);
    return (
        <>
            {/* workout top section */}
            <section>
                <p>{workout.createdBy.name}</p>
                <h1>{workout.title || "My workout"}</h1>
                <p>{workout.description || "Add a description"}</p>
            </section>

            {/* workout exercises */}
            <section>
                <h2>Exercises</h2>
                {workout.exercises?.length === 0 ? <p>No exercises added</p> :  
                    <ul>
                        {workout.exercises?.map((exercise, index) => 
                            <li key={exercise.id}>
                 
                                    <p>{exercise.exercise.title}</p>
                    
                            </li>
                        )}
                    </ul>
                }
            </section>
        </>
    );
}