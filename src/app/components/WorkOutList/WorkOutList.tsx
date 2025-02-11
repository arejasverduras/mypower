"use client"
import { useEffect, useState } from "react";
import { WorkoutWithRelations } from "../../../../types/workout";
// components
import { SearchBar } from "../UI functions/SearchBar/SearchBar";
import { WorkOutCard } from "./WorkOutCard/WorkOutCard";

export const WorkOutList = () => {  
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

    const workoutsList = workouts.filter(workout => workout.title.includes(search));

    return (
        <div className="bg-background min-h-screen p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-heading text-text font-bold mb-6 text-center sm:text-left">All Workouts</h1>
            <SearchBar search={search} setSearch={setSearch} placeholderText="Search workouts..." />
          
            {loading ? (
              <p className="text-gray-500 text-center">Loading...</p>
                ) : workoutsList.length === 0 ? (
                <p className="text-gray-500 text-center">No workouts found</p>
                    ) : (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {workoutsList.map(workout => (
                            <WorkOutCard key={workout.id} workout={workout} />
                        ))}
                    </div>
                    )}
            {error && <p className="my-5 text-red-500 text-center">{error}</p>}
          </div>
        </div>
      );

};