
import { useState } from "react";
import { Modal } from "../../UI functions/Modal/Modal";
import { WorkoutWithRelations } from "@/types/workout";

type ExerciseWithCustomFields = WorkoutWithRelations["exercises"][0];

interface EditWorkOutExerciseMetaModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: {
    id: string;
    title: string;
    customRepetitions: ExerciseWithCustomFields["customRepetitions"];
    customSets: ExerciseWithCustomFields["customSets"];
    customDescription: ExerciseWithCustomFields["customDescription"];
  };
  onSave: (updatedExercise: {
    id: string;
    customRepetitions: ExerciseWithCustomFields["customRepetitions"];
    customSets: ExerciseWithCustomFields["customSets"];
    customDescription: ExerciseWithCustomFields["customDescription"];
  }) => void;
}

export const EditWorkOutExerciseMetaModal = ({
  isOpen,
  onClose,
  exercise,
  onSave,
}: EditWorkOutExerciseMetaModalProps) => {
  const [customRepetitions, setCustomRepetitions] = useState(exercise.customRepetitions || null);
  const [customSets, setCustomSets] = useState(exercise.customSets || 0);
    const [customDescription, setCustomDescription] = useState(exercise.customDescription || "");

  const handleSave = () => {
    onSave({ id: exercise.id, customRepetitions, customSets, customDescription });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit Metadata for ${exercise.title}`} onSave={handleSave}>
      <div className="space-y-4">
      <div>
          <label htmlFor="customDescription" className="block text-sm font-medium">
            Custom Description
          </label>
          <input
            id="customDescription"
            type="text"
            value={customDescription}
            onChange={(e) => setCustomDescription(e.target.value)}
            className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <div>
          <label htmlFor="customReps" className="block text-sm font-medium">
            Custom Reps
          </label>
          <input
            id="customReps"
            type="text"
            value={customRepetitions || ""}
            onChange={(e) => setCustomRepetitions(e.target.value)}
            className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <div>
          <label htmlFor="customSets" className="block text-sm font-medium">
            Custom Sets
          </label>
          <input
            id="customSets"
            type="number"
            value={customSets}
            onChange={(e) => setCustomSets(Number(e.target.value))}
            className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
      </div>
    </Modal>
  );
};