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
    handleAdd: () => void;
}

export const WorkOutAddExercises = ({exercises, setExercises, handleAdd}: WorkOutAddExercisesProps) => {
    // search exercises from the library to add to the workout on the workout page (wrapped in WorkOut component)
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<ExerciseWithRelations[]>([]);
    const [error, setError] = useState("test error");
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

    console.log(searchResults);
    
    return (
        <>
            <SearchBar search={search} setSearch={setSearch} placeholderText="Find exercises to add.." />
            {error && <Error error={error} />}

            <div className="flex flex-col space-y-8 bg-midnightblue text-white p-4 rounded-lg shadow-md w-full">
            {loading ? <div>Searching...</div> :
                searchResults.length > 0 && search !== "" ? (
                    searchResults.map((exercise, index) => (
                        <WorkOutAddExerciseCard key={index} exercise={exercise} context={"workOutSearch"} /> 
                    ))
                ) : (
                    <div>{search !== "" ? "No exercises found" : "Find exercises to add"}</div>
                )}
            </div>
            
        </>
    )
};
