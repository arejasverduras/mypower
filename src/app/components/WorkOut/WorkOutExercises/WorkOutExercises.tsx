import { useState } from "react";
import { WorkoutWithRelations } from "../../../../../types/workout";



export const WorkOutExercises = ({workoutExercises}:{workoutExercises: WorkoutWithRelations["exercises"] | []}) => {
    const [exercises, setExercises] = useState(workoutExercises);
    
    return (
        <div className="flex flex-col bg-midnightblue text-white p-4 rounded-lg shadow-md w-full">
 
            {exercises.length > 0 ? exercises.map((exercise, index) => (
                
                <p key={index}>{exercise.exercise.title} ExerciseCard </p>
            )) : <div>Add exercises to get started..</div>    
            }
        </div>
    )
};