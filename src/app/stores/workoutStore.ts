import {create} from 'zustand';
import { WorkoutWithRelations } from '@/types/workout';

interface WorkoutState {
    currentWorkout: WorkoutWithRelations | null;
    setWorkout: (workout: WorkoutWithRelations) => void;
    updateWorkout: (updatedWorkout: Partial<WorkoutWithRelations>) => void;
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
}));