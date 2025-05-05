import { create } from "zustand";
import { WorkoutWithRelations } from "@/types/workout";
import { ExerciseWithRelations } from "@/types/exercise";
import { useMessageStore } from "./apiMessageStore";

interface WorkoutState {
    currentWorkout: WorkoutWithRelations | null;
    setWorkout: (workout: WorkoutWithRelations) => void;
    updateWorkout: (updatedWorkout: Partial<WorkoutWithRelations>) => void;
    addExercise: (workoutId: string, exercise: ExerciseWithRelations) => Promise<void>;
    editExerciseMeta: (
        workoutId: string,
        exerciseId: string,
        metadata: {
            customRepetitions: string | null;
            customSets: number | null;
            customDescription: string | null;
            customBreak: string | null;
            customExecution: string | null;
            customRest: string | null;
        }
    ) => Promise<void>;
    reorderExercises: (workoutId: string, newOrder: string[]) => Promise<void>;
    deleteExercise: (workoutId: string, exerciseId: string) => Promise<void>;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
    currentWorkout: null,
    setWorkout: (workout) => set({ currentWorkout: workout }),
    updateWorkout: (updatedWorkout) =>
        set((state) => ({
            currentWorkout: state.currentWorkout
                ? { ...state.currentWorkout, ...updatedWorkout }
                : { ...updatedWorkout } as WorkoutWithRelations,
        })),

    addExercise: async (workoutId, exercise) => {
        const { addMessage, setApiLoading, setCustomLoadingMessage, clearMessages } = useMessageStore.getState(); // Access message store

        set((state) => {
            if (!state.currentWorkout) {
                throw new Error("currentWorkout is null"); // Handle null state explicitly
            }
    
            const newExercise = {
                id: crypto.randomUUID(), // Generate a unique ID for optimistic update
                workoutId,
                exercise,
                exerciseId: exercise.id,
                customDescription: null,
                customSets: null,
                customRepetitions: null,
                customBreak: null,
                customExecution: null,
                customRest: null,
                order: state.currentWorkout.exercises.length + 1, // Calculate order here
            };
    
            return {
                currentWorkout: {
                    ...state.currentWorkout,
                    exercises: [...state.currentWorkout.exercises, newExercise],
                },
            };
        });
    

        clearMessages();
        setApiLoading(true);
        setCustomLoadingMessage("Adding exercise...");

        try {
            const res = await fetch(`/api/workouts/${workoutId}/edit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ exerciseId: exercise.id }),
            });

            if (!res.ok) {
                throw new Error("Failed to add exercise");
            }

            const updatedWorkout = await res.json();
            set({ currentWorkout: updatedWorkout }); // Update state with API response
            addMessage({ type: "success", text: "Exercise added successfully" });
        } catch (error) {
            console.error(error);
            addMessage({ type: "error", text: "Failed to add exercise" });

            // Rollback state if API call fails
            set((state) => {
                if (!state.currentWorkout) {
                    throw new Error("currentWorkout is null"); // Handle null state explicitly
                }
    
                return {
                    currentWorkout: {
                        ...state.currentWorkout,
                        exercises: state.currentWorkout.exercises.filter(
                            (e) => e.exerciseId !== exercise.id
                        ),
                    },
                };
            });
        } finally {
            setApiLoading(false);
            setCustomLoadingMessage("");
        }
    },
    editExerciseMeta: async (
        workoutId: string,
        exerciseId: string,
        metadata: {
            customRepetitions: string | null;
            customSets: number | null;
            customDescription: string | null;
            customBreak: string | null;
            customExecution: string | null;
            customRest: string | null;
        }
    ) => {
        const { addMessage, setApiLoading, setCustomLoadingMessage, clearMessages } = useMessageStore.getState();
    
        clearMessages();
        setApiLoading(true);
        setCustomLoadingMessage("Updating exercise metadata...");
    
        try {
            const res = await fetch(`/api/workouts/${workoutId}/edit`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ exerciseId, ...metadata }),
            });
    
            if (!res.ok) {
                addMessage({ type: "error", text: "Failed to update exercise metadata" });
                return;
            }
    
            const updatedWorkout = await res.json();
            set({ currentWorkout: updatedWorkout }); // Update state with API response
            addMessage({ type: "success", text: "Exercise metadata updated successfully" });
        } catch (error) {
            console.error(error);
            addMessage({ type: "error", text: "Failed to update exercise metadata" });
        } finally {
            setApiLoading(false);
            setCustomLoadingMessage("");
        }
    },
    reorderExercises: async (workoutId: string, newOrder: string[]) => {
        const { addMessage, setApiLoading, setCustomLoadingMessage, clearMessages } = useMessageStore.getState();
    
        clearMessages();
        setApiLoading(true);
        setCustomLoadingMessage("Reordering exercises...");
    
        // Optimistically update the state
        set((state) => {
            if (!state.currentWorkout) {
                throw new Error("currentWorkout is null");
            }
    
            const reorderedExercises = newOrder
                .map((id) =>
                    state.currentWorkout?.exercises.find((exercise) => exercise.exercise.id === id)
                )
                .filter((exercise): exercise is NonNullable<typeof exercise> => exercise !== undefined);
    
            return {
                currentWorkout: {
                    ...state.currentWorkout,
                    exercises: reorderedExercises,
                },
            };
        });
    
        try {
            const res = await fetch(`/api/workouts/${workoutId}/edit`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ exerciseOrder: newOrder }),
            });
    
            if (!res.ok) {
                throw new Error("Failed to reorder exercises");
            }
    
            const updatedWorkout = await res.json();
            set({ currentWorkout: updatedWorkout }); // Update state with API response
            addMessage({ type: "success", text: "Exercises reordered successfully" });
        } catch (error) {
            console.error(error);
            addMessage({ type: "error", text: "Failed to reorder exercises" });
        } finally {
            setApiLoading(false);
            setCustomLoadingMessage("");
        }
    },
    deleteExercise: async (workoutId: string, exerciseId: string) => {
        const { addMessage, setApiLoading, setCustomLoadingMessage, clearMessages } = useMessageStore.getState();
    
        clearMessages();
        setApiLoading(true);
        setCustomLoadingMessage("Removing exercise...");
    
        try {
            const res = await fetch(`/api/workouts/${workoutId}/edit`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ exerciseId }),
            });
    
            if (!res.ok) {
                throw new Error("Failed to remove exercise from workout");
            }
    
            const updatedWorkout = await res.json();
            set({ currentWorkout: updatedWorkout }); // Update state with API response
            addMessage({ type: "success", text: "Exercise removed successfully from workout" });
        } catch (error) {
            console.error(error);
            addMessage({ type: "error", text: "Failed to remove exercise from workout" });
        } finally {
            setApiLoading(false);
            setCustomLoadingMessage("");
        }
    },





}));