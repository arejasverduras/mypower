"use client"
import { useState, useEffect } from "react";
import { SearchBar } from "../../UI functions/SearchBar/SearchBar";
import { WorkOutAddExerciseCard } from "../WorkOutAddExerciseCard/WorkOutAddExerciseCard";
import { WorkoutWithRelations } from "../../../../../types/workout";
import { ExerciseWithRelations } from "../../../../../types/exercise";

interface WorkOutAddExercisesProps {

    exercises: WorkoutWithRelations["exercises"];
    setExercises: (exercises: WorkoutWithRelations["exercises"]) => void;
}

export const WorkOutAddExercises = ({exercises, setExercises}: WorkOutAddExercisesProps) => {
    // search exercises from the library to add to the workout on the workout page (wrapped in WorkOut component)
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<ExerciseWithRelations[]>([]);
    const [error, setError] = useState("");

    // search for exercises by querying the api at /exercises. use debouncing while typing the search query
    useEffect(() => {
        if (search !== "")
        fetch(`/api/exercises?search=${search}`)
            .then(res => res.json())
            .then(data => setSearchResults(data))
            .catch(err => {
                setError(err);
                console.log(err);
            });
    }, [search]);

    console.log(searchResults);
    
    return (
        <>
            <SearchBar search={search} setSearch={setSearch} placeholderText="Find exercises to add.." />
            {error && <div className="text-red-500">{error}</div>}
            {/* {searchResults.length > 0 && search !== ""?
                <WorkOutExercises workoutExercises={searchResults} context="search" /> 
                : <div> No exercises found</div>} */}

            <div className="flex flex-col space-y-8 bg-midnightblue text-white p-4 rounded-lg shadow-md w-full">
                        {searchResults.length > 0  && search !== "" ? (
                            searchResults.map((exercise, index) => (
                                <WorkOutAddExerciseCard key={index} exercise={exercise} context={"workOutSearch"} /> 
                                
                            ))
                        ) : (
                            <div>No exercises found </div>
                        )}
                    </div>
            
        </>
    )

};


