"use client"
import { useState, useEffect } from "react";
import { SearchBar } from "../../UI functions/SearchBar/SearchBar";
import { WorkOutAddExerciseCard } from "../WorkOutAddExerciseCard/WorkOutAddExerciseCard";
import { WorkoutWithRelations } from "../../../../../types/workout";
import { ExerciseWithRelations } from "../../../../../types/exercise";
import { Error } from "../../UI functions/Error/Error";

interface WorkOutAddExercisesProps {

    exercises: WorkoutWithRelations["exercises"];
    setExercises: (exercises: WorkoutWithRelations["exercises"]) => void;
    workoutId: string;
}

export const WorkOutAddExercises = ({exercises, setExercises, workoutId}: WorkOutAddExercisesProps) => {
    // search exercises from the library to add to the workout on the workout page (wrapped in WorkOut component)
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<ExerciseWithRelations[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    // search for exercises by querying the api at /exercises. use debouncing while typing the search query
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search !== "") {
                setLoading(true);
                fetch(`/api/exercises?search=${search}`)
                    .then(res => res.json())
                    .then(data => {
                        setSearchResults(data);
                        setLoading(false);
                    })
                    .catch(err => {
                        setError(err);
                        setLoading(false);
                        console.log(err);
                    });
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const handleAddExercise = async (exercise: ExerciseWithRelations) => {
        try {
            const res = await fetch(`/api/workouts/${workoutId}/edit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ workoutId, exerciseId: exercise.id }),
            });

            if (!res.ok) {
                setError('Failed to add exercise');
                return;
            }

            const updatedWorkout = await res.json();
            setExercises(updatedWorkout.exercises);
        } catch (error) {
            console.error(error);
            setError('Failed to add exercise');
        }
    };

    const checkExisting = (exercise: ExerciseWithRelations, exercises: WorkoutWithRelations["exercises"]) => {
        return exercises.some(existingExercise => existingExercise.exerciseId === exercise.id);
    }
    
    return (
        <div className="bg-midnightblue w-full rounded-lg">
            <SearchBar search={search} setSearch={setSearch} placeholderText="Find exercises to add.." />
            {error && <Error error={error} />}

            <div className="flex flex-col space-y-8 bg-midnightblue text-white p-4 rounded-lg shadow-md w-full">
            {loading ? <div>Searching...</div> :
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
