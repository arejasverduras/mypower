"use client";
import { useEffect, useState } from "react";
import { WorkoutWithRelations } from "../../../types/workout";
import { WorkOutList } from "./WorkOutList/WorkOutList";
import { SearchBar } from "../UI functions/SearchBar/SearchBar";
import { useSessionContext } from "@/context/SessionContext";
import { CreateWorkoutModal } from "./CreateWorkoutModal/CreateWorkoutModal";
import { Error } from "../UI functions/Errors/ErrorItem/ErrorItem";

export const WorkOuts = () => {
    const [workouts, setWorkouts] = useState<WorkoutWithRelations[]>([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { session } = useSessionContext();

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
                setError("Failed to load workouts");
            } finally {
                setLoading(false);
            }
        };
        fetchWorkouts();
    }, []);

    const handleAddWorkout = async (newWorkout: { title: string; description?: string | null }) => {
        try {
            const res = await fetch("/api/workouts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newWorkout),
            });

            if (!res.ok) 
                {setError("Failed to add workout");
                return
            };
         

            const addedWorkout: WorkoutWithRelations = await res.json();
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

    // Search functionality (filtering)
    const lowerCaseSearch = search.toLowerCase();

    const workoutsList = workouts.filter(
        (workout) =>
            workout.title.toLowerCase().includes(lowerCaseSearch) ||
            workout.description?.toLowerCase().includes(lowerCaseSearch) ||
            workout.tags.some((tag) => tag.name.toLowerCase().includes(lowerCaseSearch)) ||
            workout.createdBy.name?.toLowerCase().includes(lowerCaseSearch) ||
            workout.exercises.some((exercise) => exercise.exercise.title.toLowerCase().includes(lowerCaseSearch))
    );

    return (
        <div className="bg-background min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                <SearchBar search={search} setSearch={setSearch} placeholderText="Search workouts..." />
                {loading ? (
                    <p className="text-gray-500 text-center">Loading...</p>
                ) : workoutsList.length === 0 ? (
                    <p className="text-gray-500 text-center">No workouts found</p>
                ) : (
                    <WorkOutList workouts={workoutsList} />
                )}
                <Error error={error}/>
                <button
                    onClick={checkForSignIn}
                    className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
                >
                    + Add Workout +
                </button>
                <CreateWorkoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddWorkout} />
            </div>
        </div>
    );
};
