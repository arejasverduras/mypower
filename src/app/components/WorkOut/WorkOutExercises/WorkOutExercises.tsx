import { useState } from "react";
import { WorkoutWithRelations } from "../../../../../types/workout";
import { WorkOutExerciseCard } from "../WorkOutExerciseCard";



export const WorkOutExercises = ({workoutExercises}:{workoutExercises: WorkoutWithRelations["exercises"] | []}) => {
    const [exercises, setExercises] = useState(workoutExercises);
    
    return (
        <div className="flex flex-col space-y-8 bg-midnightblue text-white p-4 rounded-lg shadow-md w-full">
 
            {exercises.length > 0 ? exercises.map((exercise, index) => (
                <WorkOutExerciseCard key={index} exercise={exercise} />
             
            )) : <div>Add exercises to get started..</div>    
            }
        </div>
    )
};