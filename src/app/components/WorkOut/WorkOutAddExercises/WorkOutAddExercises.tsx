"use client"
import { useState, useEffect } from "react";
import { SearchBar } from "../../UI functions/SearchBar/SearchBar";
import { WorkOutAddExerciseCard } from "../WorkOutAddExerciseCard/WorkOutAddExerciseCard";
import { WorkoutWithRelations } from "../../../../types/workout";
import { ExerciseWithRelations } from "../../../../types/exercise";
import { useMessageContext } from "@/context/MessageContext";

interface WorkOutAddExercisesProps {

    exercises: WorkoutWithRelations["exercises"];
    onUpdate: (updatedWorkout: WorkoutWithRelations) => void;
    workoutId: string;
}

export const WorkOutAddExercises = ({exercises, onUpdate, workoutId}: WorkOutAddExercisesProps) => {
    // search exercises from the library to add to the workout on the workout page (wrapped in WorkOut component)
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<ExerciseWithRelations[]>([]);

    const { addMessage, apiLoading, setApiLoading, clearMessages } = useMessageContext();
    
    // search for exercises by querying the api at /exercises. use debouncing while typing the search query
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (search !== "") {
                clearMessages();
                setApiLoading(true);
    
                try {
                    const res = await fetch(`/api/exercises?search=${search}`);
                    if (!res.ok) {
                        throw new Error("Failed to fetch exercises");
                    }
    
                    const data = await res.json();
                    setSearchResults(data);
                } catch (err) {
                    console.error("Error searching exercises:", err);
                    addMessage({ type: "error", text: "Failed to search exercises" });
                } finally {
                    setApiLoading(false);
                }
            }
        }, 300);
    
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    // POST exercise to the workout
    const handleAddExercise = async (exercise: ExerciseWithRelations) => {
        clearMessages();
        setApiLoading(true);
        
        try {
            const res = await fetch(`/api/workouts/${workoutId}/edit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ workoutId, exerciseId: exercise.id }),
            });

            if (!res.ok) {
                addMessage({type: "error", text: "Failed to add exercise"});
                return;
            }

            const updatedWorkout = await res.json();
            onUpdate(updatedWorkout); // Update currentWorkout with the new data
            addMessage({type: "success", text: "Exercise added successfully"});
        } catch (error) {
            console.error(error);
            addMessage({type: "error", text: "Failed to add exercise"});
        } finally {
            setApiLoading(false);
        }
    };

    const checkExisting = (exercise: ExerciseWithRelations, exercises: WorkoutWithRelations["exercises"]) => {
        return exercises.some(existingExercise => existingExercise.exerciseId === exercise.id);
    }
    
    return (
        <div className="bg-midnightblue w-full rounded-lg">
            <SearchBar search={search} setSearch={setSearch} placeholderText="Find exercises to add.." />

            <div className="flex flex-col space-y-8 bg-midnightblue text-white p-4 rounded-lg shadow-md w-full">
            {apiLoading ? <div>Searching...</div> :
                searchResults.length > 0 && search !== "" ? (
                    searchResults.map((exercise, index) => (
                        
                        <WorkOutAddExerciseCard 
                            key={index} 
                            exercise={exercise} 
                            context={"workOutSearch"}
                            onAdd={handleAddExercise}
                            exists={checkExisting(exercise, exercises)}
                            /> 
                    ))
                ) : (
                    <div>{search !== "" ? "No exercises found" : "Find exercises to add"}</div>
                )}
            </div>
            
        </div>
    )
};
