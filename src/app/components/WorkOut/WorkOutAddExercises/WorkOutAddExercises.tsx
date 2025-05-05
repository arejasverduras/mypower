"use client"
import { useState, useEffect } from "react";
import { SearchBar } from "../../UI functions/SearchBar/SearchBar";
import { WorkOutAddExerciseCard } from "../WorkOutAddExerciseCard/WorkOutAddExerciseCard";
import { ExerciseWithRelations } from "../../../../types/exercise";
import { useWorkoutStore } from "@/app/stores/workoutStore";
import { useMessageStore } from "@/app/stores/apiMessageStore";

interface WorkOutAddExercisesProps {
    workoutId: string;
}

export const WorkOutAddExercises = ({ workoutId}: WorkOutAddExercisesProps) => {
    // search exercises from the library to add to the workout on the workout page (wrapped in WorkOut component)
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<ExerciseWithRelations[]>([]);

    const { currentWorkout, addExercise} = useWorkoutStore();
    const { addMessage, apiLoading, setApiLoading, setCustomLoadingMessage, clearMessages } = useMessageStore();
    
    // search for exercises by querying the api at /exercises. use debouncing while typing the search query
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (search !== "") {
                clearMessages();
                setApiLoading(true);
                setCustomLoadingMessage("Searching for exercises...");
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
                    setCustomLoadingMessage("");
                }
            }
        }, 300);
    
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    // POST exercise to the workout
    const handleAddExercise = async (exercise: ExerciseWithRelations) => {
        await addExercise(workoutId, exercise);
    };

      // Check if an exercise already exists in the workout
      const checkExisting = (exercise: ExerciseWithRelations) => {
        return currentWorkout?.exercises.some(
            (existingExercise) => existingExercise.exerciseId === exercise.id
        );
    };
    
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
                            exists={checkExisting(exercise)||false}
                            /> 
                    ))
                ) : (
                    <div>{search !== "" ? "No exercises found" : "Find exercises to add"}</div>
                )}
            </div>
            
        </div>
    )
};
