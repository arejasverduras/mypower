"use client";
import { useEffect, useState } from "react";
import { WorkoutWithRelations } from "../../../types/workout";
import { WorkOutList } from "./WorkOutList/WorkOutList";
import { SearchBar } from "../UI functions/SearchBar/SearchBar";
import { useSessionContext } from "@/context/SessionContext";
import { CreateWorkoutModal } from "./CreateWorkoutModal/CreateWorkoutModal";
import { useMessageContext } from "@/context/MessageContext";
import { LoadingSpinner } from "../UI functions/LoadingSpinner/LoadingSpinner";

export const WorkOuts = () => {
    const [workouts, setWorkouts] = useState<WorkoutWithRelations[]>([]);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { session } = useSessionContext();
    const { addMessage, apiLoading, setApiLoading, clearMessages } = useMessageContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            setApiLoading(true);
            clearMessages();
            try {
                const res = await fetch("/api/workouts", { method: "GET" });
                if (!res.ok) {
                    addMessage({ type: "error", text: "Failed to load workouts" });
                    return;
                }
                const data = await res.json();
                setWorkouts(data);
            } catch (err) {
                console.error(err);
                addMessage({ type: "error", text: "Failed to load workouts" });
            } finally {
                setApiLoading(false);
            }
        };
        fetchWorkouts();
    }, []);

    const handleUpdateWorkout = (updatedWorkout: WorkoutWithRelations) => {
        setWorkouts((prevWorkouts) =>
            prevWorkouts.map((workout) =>
                workout.id === updatedWorkout.id ? updatedWorkout : workout
            )
        );
    };

    const handleDeleteWorkout = (deletedWorkoutId: string) => {
        setWorkouts((prevWorkouts) =>
            prevWorkouts.filter((workout) => workout.id !== deletedWorkoutId)
        );
    };

    const handleAddWorkout = async (newWorkoutData: { title: string; description?: string | null }) => {
        clearMessages();

        try {
            setApiLoading(true);
            const res = await fetch("/api/workouts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newWorkoutData),
            });

            if (!res.ok) {
                addMessage({ type: "error", text: "Failed to create workout" });
                return;
            }

            const createdWorkout = await res.json();
            setWorkouts((prev) => [createdWorkout, ...prev]); // Add the new workout to the state
            addMessage({ type: "success", text: "Workout created successfully" });
        } catch (error) {
            console.error("Error creating workout:", error);
            addMessage({ type: "error", text: "An error occurred while creating the workout" });
        } finally {
            setApiLoading(false);
        }
    };

    const workoutsList = workouts.filter((workout) => {
        const lowerCaseSearch = search.toLowerCase();
        return (
            workout.title.toLowerCase().includes(lowerCaseSearch) ||
            workout.description?.toLowerCase().includes(lowerCaseSearch) ||
            workout.tags.some((tag) => tag.name.toLowerCase().includes(lowerCaseSearch)) ||
            workout.createdBy.name?.toLowerCase().includes(lowerCaseSearch) ||
            workout.exercises.some((exercise) =>
                exercise.exercise.title.toLowerCase().includes(lowerCaseSearch)
            )
        );
    });

    return (
        <div className="flex flex-col min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                <SearchBar search={search} setSearch={setSearch} placeholderText="Search workouts..." />
                {apiLoading ? (
                    <LoadingSpinner />
                ) : workoutsList.length === 0 ? (
                    <p className="text-gray-500 text-center">No workouts found</p>
                ) : (
                    <WorkOutList
                        workouts={workoutsList}
                        onUpdate={handleUpdateWorkout}
                        onDelete={handleDeleteWorkout}
                    />
                )}
                <button
                    onClick={() => (session ? setIsModalOpen(true) : alert("You must be signed in to add a workout"))}
                    className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
                >
                    + Add Workout +
                </button>
                <CreateWorkoutModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleAddWorkout}
                />
            </div>
        </div>
    );
};