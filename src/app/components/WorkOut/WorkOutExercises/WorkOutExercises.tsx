import { useState } from "react";
import { WorkoutWithRelations } from "../../../../types/workout";
import { WorkOutExerciseCard } from "../WorkOutExerciseCard/WorkOutExerciseCard";
import { EditWorkOutExerciseMetaModal } from "../EditWorkOutExerciseMetaModal/EditWorkOutExerciseMetaModal";

type ExerciseWithCustomFields = WorkoutWithRelations["exercises"][0];

interface WorkOutExercisesProps {
  workoutExercises: ExerciseWithCustomFields[];
  context: "view" | "edit" | "search";
  onDelete: (exerciseId: string) => void;
  onUpdateExercise: (updatedExercise: {
    id: string;
    customRepetitions: ExerciseWithCustomFields["customRepetitions"];
    customSets: ExerciseWithCustomFields["customSets"];
    customDescription: ExerciseWithCustomFields["customDescription"];
  }) => void;
}

export const WorkOutExercises = ({
  workoutExercises,
  context,
  onDelete,
  onUpdateExercise,
}: WorkOutExercisesProps) => {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseWithCustomFields | null>(null);

  const handleEditClick = (exercise: WorkoutWithRelations["exercises"][0]) => {
    setSelectedExercise(exercise);
  };

  return (
    <div className="flex flex-col space-y-8 bg-midnightblue text-white p-4 rounded-lg shadow-md w-full">
      {workoutExercises.length > 0 ? (
        workoutExercises.map((exercise, index) => (
          <div key={index} className="flex justify-between items-center">
            <WorkOutExerciseCard
              exercise={exercise}
              context={context}
              onDelete={onDelete}
            />
            {context === "edit" && (
              <button
                onClick={() => handleEditClick(exercise)}
                className="py-1 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
            )}
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
          }}
          onSave={(updatedExercise) => {
            onUpdateExercise(updatedExercise);
            setSelectedExercise(null);
          }}
        />
      )}
    </div>
  );
};