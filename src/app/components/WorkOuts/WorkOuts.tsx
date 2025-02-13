"use client"
import { useEffect, useState } from "react";
import { WorkoutWithRelations } from "../../../../types/workout";
import { WorkOutList } from "./WorkOutList/WorkOutList";
import { SearchBar } from "../UI functions/SearchBar/SearchBar";

export const WorkOuts = () => {
    const [workouts, setWorkouts] = useState<WorkoutWithRelations[]>([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchWorkouts = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/workouts", { method: "GET" });
                if (!res.ok) {
                    setError("Failed to load workouts");
                    return;
                }
                const data = await res.json();

                setWorkouts(data);
            } catch (err) {
                console.error(err);
                console.error("Failed to load workouts");
            } finally {
                setLoading(false);
            }
        };
        fetchWorkouts();
    }, []);

    // search functionality (filtering)
    const lowerCaseSearch = search.toLowerCase();

    const workoutsList = workouts.filter(workout => 
      workout.title.toLowerCase().includes(lowerCaseSearch) ||
      workout.description?.toLowerCase().includes(lowerCaseSearch) ||
      workout.tags.some(tag => tag.name.toLowerCase().includes(lowerCaseSearch)) ||
      workout.createdBy.name?.toLowerCase().includes(lowerCaseSearch) ||
      workout.exercises.some(exercise => exercise.exercise.title.toLowerCase().includes(lowerCaseSearch))
    );

    return (
        <>
            
            <SearchBar search={search} setSearch={setSearch} placeholderText="Search workouts..." />
            {loading ? <p className="text-gray-500 text-center">Loading...</p> 
                : workoutsList.length === 0 ? <p className="text-gray-500 text-center">No workouts found</p>
                    : 
                    <WorkOutList workouts={workoutsList} />
            }
            {error && <p className="my-5 text-red-500 text-center">{error}</p>}
        </>
    )
};
