import { WorkoutWithRelations } from "../../../../types/workout";
import { WorkOutExerciseCard } from "../WorkOutExerciseCard/WorkOutExerciseCard";

interface WorkOutExercisesProps {
    workoutExercises: WorkoutWithRelations["exercises"];
    context: "view" | "edit" | "search";
    onDelete: (exerciseId: string) => void;
}

export const WorkOutExercises = ({ workoutExercises, context, onDelete }: WorkOutExercisesProps) => {
    

    
    return (
        <div className="flex flex-col space-y-8 bg-midnightblue text-white p-4 rounded-lg shadow-md w-full">
            {workoutExercises.length > 0 ? (
                workoutExercises.map((exercise, index) => (
                    <WorkOutExerciseCard key={index} exercise={exercise} context={context} onDelete={onDelete} /> 
                ))
            ) : (
                <div>{context === "search" ? "No exercises found" : "Add exercises to get started.."}</div>
            )}
        </div>
    );
};