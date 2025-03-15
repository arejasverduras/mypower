"use client"
import { useEffect, useState } from "react";
import { WorkoutWithRelations } from "../../../../types/workout";
import { WorkOutList } from "./WorkOutList/WorkOutList";
import { SearchBar } from "../UI functions/SearchBar/SearchBar";
import { useSession } from "@/context/SessionContext";
import { CreateWorkoutModal } from "./CreateWorkoutModal/CreateWorkoutModal";

export const WorkOuts = () => {
    const [workouts, setWorkouts] = useState<WorkoutWithRelations[]>([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { session } = useSession();
    
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

    const handleAddWorkout = async (newWorkout: {
        title: string;
        description?: string;
        isPublic?: boolean;
        exercises: { id: string; customDescription?: string; customSets?: number; customRepetitions?: string }[];
        tags: string[];
    }) => {
        try {
            const res = await fetch("/api/workouts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newWorkout),
            });

            if (!res.ok) throw new Error("Failed to add workout");

            const addedWorkout = await res.json();
            setWorkouts((prev) => [addedWorkout, ...prev]);
        } catch (err) {
            console.error(err);
            setError("Failed to add workout");
        }
    };

    const checkForSignIn = () => {
        if (!session) {
            alert("You must be signed in to add a workout");
        } else {
            setIsModalOpen(true);
        }
    };


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
        <div className="bg-background min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                <SearchBar search={search} setSearch={setSearch} placeholderText="Search workouts..." />
                {loading ? <p className="text-gray-500 text-center">Loading...</p> 
                    : workoutsList.length === 0 ? <p className="text-gray-500 text-center">No workouts found</p>
                        : 
                        <WorkOutList workouts={workoutsList} />
                }
                {error && <p className="my-5 text-red-500 text-center">{error}</p>}
                <button
                    onClick={checkForSignIn}
                    className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
                >
                    + Add Workout +
                </button>
                <CreateWorkoutModal 
                    onAdd={handleAddWorkout}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </div>
    )
};
