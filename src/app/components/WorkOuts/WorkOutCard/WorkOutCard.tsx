import { WorkoutWithRelations } from "../../../../types/workout";
import Link from "next/link";
import { EditDeleteButtons } from "../../UI functions/EditDeleteButtons/EditDeleteButtons";
// import { Errors, ErrorsType } from "../../UI functions/Errors/Errors";
// import { useState } from "react";

export const WorkOutCard = ({workout}: {workout: WorkoutWithRelations}) => {
    // const [errors, setErrors] = useState<ErrorsType>([]);


    // const handleDelete = async (id:string) => {
    //     setErrors([]);

    //     if (!creatorOrSuper) {

    //         setErrors((prev) => [...prev, "You are not authorized to delete this workout."]);
    //         return;
    //         }
    
    //     if (!confirm("Are you sure you want to delete this workout?")) return;
    
    //     try {
    //         const res = await fetch(`/api/workouts/${id}`, { method: "DELETE" });
    
    //         if (!res.ok) {
    //             setErrors((prev) => [...prev, "Failed to delete workout"]);
    //             return;
    //         }
            
    //         alert("Workout deleted successfully");
    //         router.push("/workouts")
    //     } catch (err) {
    //         console.error(err);
    //         setErrors((prev) => [...prev, "Failed to delete workout"]);
    //         return;
    //     }
    //     };

    return (
        <div key={workout.id} data-cy="workout-card" className="bg-white shadow-card p-5 rounded-xl border border-gray-200">
            <h3 className="text-xl font-semibold text-text">{workout.title}</h3>
            <p>{workout.id}</p>
            <p className="text-gray-600">{workout.description}</p>
            {workout.tags && (
            <p className="text-sm text-gray-500">Tags: {workout.tags.map(tag => tag.name).join(", ")}</p>
            )}
            <p className="text-sm text-gray-500">Created by: {workout.createdBy?.name || "Unknown"}</p>
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
                <Link href={`/workouts/${workout.id}`}>

                    <button className="bg-secondary text-white px-3 py-2 rounded-xl hover:bg-green-600 transition">
                        View
                    </button>
                </Link>
                <EditDeleteButtons id={workout.id} onEdit={()=>{}} handleDelete={()=>{}} />
                <button className="bg-accent text-white px-3 py-2 rounded-xl hover:bg-yellow-500 transition">
                    Like
                </button>
            </div>
        </div>
                  
    )
};
