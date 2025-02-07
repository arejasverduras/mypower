"use client"
import { useEffect, useState } from "react";
import { WorkoutWithRelations } from "../../../../types/workout";

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

    const workoutsResults = 
        workoutsList.length === 0 && !loading ? 
            <p>No workouts found</p> : 
                
            workoutsList.map(workout => (
                    
                    <div key={workout.id} data-cy="workout-card">
                        <h3>{workout.title}</h3>
                        <p>{workout.description}</p>
                        {workout.tags && 
                            <p>{workout.tags.map(tag => tag.name).join(", ")}</p>}
                        <p>Created by: {workout.createdBy.name}</p>
                        <p>Likes: {workout.likedBy.length}</p>
                        <p>Part of programs: {workout.programs.length}</p>
                        {workout.exercises && 
                            (
                                <>
                                    <h4>Workout Exercises</h4>
                                    <ul>{workout.exercises.map(exercise => 
                                        <li key={exercise.id}>{exercise.exercise.title}</li>)}
                                    </ul>
                                </>)
                            }
                        <button>View</button>     
                        <button>Follow/Like</button>

                        {/* <button>Share</button>
                        <button>Comment</button>
                        <button>Rate</button>
                        <button>Report</button> */}
                    </div>

    ));
    
    return (
        <div className="my-5">
            <h2 data-cy="page-title">All workouts / Search results</h2>
            <input data-cy="search-input" type="text" value={search} onChange={e => setSearch(e.target.value)} />
            <button data-cy="search-button">Search</button>
            {loading ? <p>Loading...</p> : <div>{workoutsResults}</div>}
            {error && <p className="my-5 text-red-500">{error}</p>}
        </div>
    )
};