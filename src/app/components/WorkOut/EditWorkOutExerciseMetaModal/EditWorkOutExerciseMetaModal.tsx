
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
    customBreak: ExerciseWithCustomFields["customBreak"];
    customExecution: ExerciseWithCustomFields["customExecution"];
    customRest: ExerciseWithCustomFields["customRest"];
  };
  onSave: (updatedExercise: {
    id: string;
    customRepetitions: ExerciseWithCustomFields["customRepetitions"];
    customSets: ExerciseWithCustomFields["customSets"];
    customDescription: ExerciseWithCustomFields["customDescription"];
    customBreak: ExerciseWithCustomFields["customBreak"];
    customExecution: ExerciseWithCustomFields["customExecution"];
    customRest: ExerciseWithCustomFields["customRest"];
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
  const [customBreak, setCustomBreak] = useState(exercise.customBreak || "2 min");
  const [customExecution, setCustomExecution] = useState(exercise.customExecution || "");
  const [customRest, setCustomRest] = useState(exercise.customRest || "3 min");


  const handleSave = () => {
    onSave({ id: exercise.id, customRepetitions, customSets, customDescription, customBreak, customExecution, customRest });
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
            type="textarea"
            placeholder="Add a custom description"
            value={customDescription}
            onChange={(e) => setCustomDescription(e.target.value)}
            className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <div>
          <label htmlFor="customExecution" className="block text-sm font-medium">
            Custom Execution
          </label>
          <input
            id="customExecution"
            type="text"
            placeholder="Add a custom execution"
            value={customExecution}
            onChange={(e) => setCustomExecution(e.target.value)}
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
        <div>
          <label htmlFor="customBreak" className="block text-sm font-medium">
            Custom Break
          </label>
          <input
            id="customBreak"
            type="text"
            value={customBreak}
            onChange={(e) => setCustomBreak(e.target.value)}
            className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <div>
          <label htmlFor="Rest" className="block text-sm font-medium">
            Rest before next exercise
          </label>
          <input
            id="Rest"
            type="text"
            value={customRest}
            onChange={(e) => setCustomRest(e.target.value)}
            className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
      </div>
    </Modal>
  );
};