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

    // const workoutsResults = 
    // workoutsList.length === 0 && !loading ? (
    //     <p className="text-gray-500 text-center">No workouts found</p>
    //     ) : (
    //         workoutsList.map(workout => (
    //             <div 
    //                 key={workout.id} 
    //                 data-cy="workout-card" 
    //                 className="bg-white shadow-md rounded-xl p-5 mb-4 border border-gray-200"
    //             >
    //                 <h3 className="text-xl font-semibold text-gray-800">{workout.title}</h3>
    //                 <p className="text-gray-600">{workout.description}</p>

    //                 {workout.tags && (
    //                     <p className="text-sm text-gray-500">
    //                         Tags: <span className="font-medium">{workout.tags.map(tag => tag.name).join(", ")}</span>
    //                     </p>
    //                 )}

    //                 <p className="text-sm text-gray-500">Created by: <span className="font-medium">{workout.createdBy.name}</span></p>
    //                 <p className="text-sm text-gray-500">❤️ {workout.likedBy.length} Likes</p>
    //                 <p className="text-sm text-gray-500">📌 Part of {workout.programs.length} programs</p>

    //                 {workout.exercises && (
    //                     <div className="mt-3">
    //                         <h4 className="text-lg font-medium text-gray-700">Workout Exercises</h4>
    //                         <ul className="list-disc list-inside text-gray-600">
    //                             {workout.exercises.map(exercise => (
    //                                 <li key={exercise.id}>{exercise.exercise.title}</li>
    //                             ))}
    //                         </ul>
    //                     </div>
    //                 )}

    //                 <div className="mt-4 flex gap-2">
    //                     <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
    //                         View
    //                     </button>
    //                     <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
    //                         Follow/Like
    //                     </button>
    //                 </div>
    //             </div>
    //         ))
    //     );

    // return (
    //     <div className="my-5 max-w-4xl mx-auto">
    //         <h2 className="text-2xl font-bold text-gray-800 mb-4" data-cy="page-title">
    //             All workouts / Search results
    //         </h2>
            
    //         <div className="flex gap-2 mb-5">
    //             <input 
    //                 data-cy="search-input" 
    //                 type="text" 
    //                 value={search} 
    //                 onChange={e => setSearch(e.target.value)} 
    //                 className="border border-gray-300 rounded-lg p-2 w-full"
    //                 placeholder="Search workouts..."
    //             />
    //             <button 
    //                 data-cy="search-button" 
    //                 className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
    //             >
    //                 Search
    //             </button>
    //         </div>

    //         {loading ? <p className="text-center text-gray-500">Loading...</p> : <div>{workoutsResults}</div>}
    //         {error && <p className="my-5 text-red-500 text-center">{error}</p>}
    //     </div>
    // );

    return (
        <div className="bg-background min-h-screen p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-heading text-text font-bold mb-6 text-center sm:text-left">All Workouts</h1>
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search workouts..."
                className="border border-gray-300 rounded-xl p-3 w-full sm:w-auto flex-grow"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition">
                Search
              </button>
            </div>
            
            {loading ? (
              <p className="text-gray-500 text-center">Loading...</p>
            ) : workoutsList.length === 0 ? (
              <p className="text-gray-500 text-center">No workouts found</p>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {workoutsList.map(workout => (
                  <div key={workout.id} data-cy="workout-card" className="bg-white shadow-card p-5 rounded-xl border border-gray-200">
                    <h3 className="text-xl font-semibold text-text">{workout.title}</h3>
                    <p className="text-gray-600">{workout.description}</p>
                    {workout.tags && (
                      <p className="text-sm text-gray-500">Tags: {workout.tags.map(tag => tag.name).join(", ")}</p>
                    )}
                    <p className="text-sm text-gray-500">Created by: {workout.createdBy.name}</p>
                    <p className="text-sm text-gray-500">❤️ {workout.likedBy.length} Likes</p>
                    <p className="text-sm text-gray-500">📌 Part of {workout.programs.length} programs</p>
                    {workout.exercises && (
                      <div className="mt-3">
                        <h4 className="text-lg font-medium text-gray-700">Workout Exercises</h4>
                        <ul className="list-disc list-inside text-gray-600">
                          {workout.exercises.map(exercise => (
                            <li key={exercise.id}>{exercise.exercise.title}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex justify-between mt-3">
                      <button className="bg-secondary text-white px-3 py-2 rounded-xl hover:bg-green-600 transition">
                        View
                      </button>
                      <button className="bg-accent text-white px-3 py-2 rounded-xl hover:bg-yellow-500 transition">
                        Like
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
    
            {error && <p className="my-5 text-red-500 text-center">{error}</p>}
          </div>
        </div>
      );

};