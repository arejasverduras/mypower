"use client"
import { useEffect, useState } from "react";
import { Workout } from "@prisma/client";


export const WorkOutList = () => {  
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        
        const fetchWorkouts = async () => {
          
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
            }
        };
        fetchWorkouts();
    }, []);


    const workoutsList = workouts.filter(workout => workout.title.includes(search));
    
    return (
        <div className="my-5">
            <h2 data-cy="page-title">All workouts / Search results</h2>
            <input data-cy="search-input" type="text" value={search} onChange={e => setSearch(e.target.value)} />
            <button data-cy="search-button">Search</button>
            {workoutsList.length === 0 && <p className="my-5">No workouts found</p>}
            {error && <p className="my-5 text-red-500">{error}</p>}
            <div>
                {workoutsList.map(workout => (
                    <div key={workout.id} data-cy="workout-card">
                        <h3>{workout.title}</h3>
                        <button data-cy="follow-button">Follow</button>
                    </div>
                ))}
             </div>
        </div>
    )
};