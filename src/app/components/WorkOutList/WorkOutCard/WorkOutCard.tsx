import { WorkoutWithRelations } from "../../../../../types/workout";

export const WorkOutCard = ({workout}: {workout: WorkoutWithRelations}) => {
    
    return (
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
                  
    )
};
