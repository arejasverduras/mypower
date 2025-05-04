import { create } from "zustand";
import { WorkoutWithRelations } from "@/types/workout";
import { ExerciseWithRelations } from "@/types/exercise";
// import { useMessageStore } from "@/app/stores/messageStore"; // Import the message store

interface WorkoutState {
    currentWorkout: WorkoutWithRelations | null;
    setWorkout: (workout: WorkoutWithRelations) => void;
    updateWorkout: (updatedWorkout: Partial<WorkoutWithRelations>) => void;
    addExercise: (workoutId: string, exercise: ExerciseWithRelations) => Promise<void>;
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
        // const { addMessage, setApiLoading, clearMessages } = useMessageStore.getState(); // Access message store

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
    

        // clearMessages();
        // setApiLoading(true);

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
            // addMessage({ type: "success", text: "Exercise added successfully" });
        } catch (error) {
            console.error(error);
            // addMessage({ type: "error", text: "Failed to add exercise" });

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
            // setApiLoading(false);
        }
    },
}));