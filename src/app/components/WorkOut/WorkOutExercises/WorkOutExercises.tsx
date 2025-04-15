import { useState } from "react";
import { WorkoutWithRelations } from "../../../../types/workout";
import { WorkOutExerciseCard } from "../WorkOutExerciseCard/WorkOutExerciseCard";
import { EditWorkOutExerciseMetaModal } from "../EditWorkOutExerciseMetaModal/EditWorkOutExerciseMetaModal";

type ExerciseWithCustomFields = WorkoutWithRelations["exercises"][0];

interface WorkOutExercisesProps {
  workoutExercises: ExerciseWithCustomFields[];
  context: "view" | "edit" | "search";
  onDelete: (exerciseId: string) => void;

  onEditExerciseMeta: (
    exerciseId: string,
    metadata: {
      customRepetitions: string | null;
      customSets: number | null;
      customDescription: string | null;
      customBreak: string | null;
    }
  ) => Promise<void>; // API call function
}

export const WorkOutExercises = ({
  workoutExercises,
  context,
  onDelete,
    onEditExerciseMeta,
}: WorkOutExercisesProps) => {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseWithCustomFields | null>(null);

  const handleEditClick = (exercise: WorkoutWithRelations["exercises"][0]) => {
    setSelectedExercise(exercise);
  };



  return (
    <div className="flex flex-col space-y-8 bg-midnightblue text-white p-4 rounded-lg shadow-md w-full">
      {workoutExercises.length > 0 ? (
        workoutExercises.map((exercise, index) => (
          <div key={index}>
            <WorkOutExerciseCard
              exercise={exercise}
              context={context}
              onDelete={onDelete}
              onEditMeta={handleEditClick}
            />

          </div>
        ))
      ) : (
        <div>{context === "search" ? "No exercises found" : "Add exercises to get started.."}</div>
      )}

      {selectedExercise && (
        <EditWorkOutExerciseMetaModal
          isOpen={!!selectedExercise}
          onClose={() => setSelectedExercise(null)}
          exercise={{
            id: selectedExercise.exercise.id,
            title: selectedExercise.exercise.title,
            customRepetitions: selectedExercise.customRepetitions,
            customSets: selectedExercise.customSets,
            customDescription: selectedExercise.customDescription,
            customBreak: selectedExercise.customBreak,
          }}
          onSave={async (updatedExercise) => {
            // Call the API function to update the metadata
            await onEditExerciseMeta(updatedExercise.id, {
              customRepetitions: updatedExercise.customRepetitions,
              customSets: updatedExercise.customSets,
              customDescription: updatedExercise.customDescription,
              customBreak: updatedExercise.customBreak,
            });

            // Close the modal
            setSelectedExercise(null);
          }}
        />
      )}
    </div>
  );
};