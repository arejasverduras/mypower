/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { WorkoutWithRelations } from "../../../../types/workout";
import { WorkOutExerciseCard } from "../WorkOutExerciseCard/WorkOutExerciseCard";
import { EditWorkOutExerciseMetaModal } from "../EditWorkOutExerciseMetaModal/EditWorkOutExerciseMetaModal";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../../DragDrop/SortableItem/SortableItem";

type ExerciseWithCustomFields = WorkoutWithRelations["exercises"][0];

interface WorkOutExercisesProps {
  workoutExercises: ExerciseWithCustomFields[];
  context: "view" | "edit" | "search";
  onDelete: (exerciseId: string) => void;
  onReorder: (newOrder: string[]) => Promise<void>; // API call function to reorder exercises


  onEditExerciseMeta: (
    exerciseId: string,
    metadata: {
      customRepetitions: string | null;
      customSets: number | null;
      customDescription: string | null;
      customBreak: string | null;
      customExecution: string | null;
      customRest: string | null;
    }
  ) => Promise<void>; // API call function
}

export const WorkOutExercises = ({
  workoutExercises,
  context,
  onDelete,
  onReorder,
  onEditExerciseMeta,
}: WorkOutExercisesProps) => {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseWithCustomFields | null>(null);


  const handleEditClick = (exercise: WorkoutWithRelations["exercises"][0]) => {
    setSelectedExercise(exercise);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
       coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = workoutExercises.findIndex((item) => item.exercise.id === active.id);
      const newIndex = workoutExercises.findIndex((item) => item.exercise.id === over.id);

      const reorderedExercises = arrayMove(workoutExercises, oldIndex, newIndex);


      // Call the API to persist the new order
      const newOrder = reorderedExercises.map((exercise) => exercise.exercise.id);
      await onReorder(newOrder);
    }
  };

  return (
<DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={workoutExercises.map((exercise) => exercise.exercise.id)}
        strategy={verticalListSortingStrategy}
      >

    <div className="flex flex-col space-y-8 bg-midnightblue text-white p-4 rounded-lg shadow-md w-full">
      {workoutExercises.length > 0 ? (
        workoutExercises.map((exercise) => (
          <SortableItem key={exercise.exercise.id} id={exercise.exercise.id}>
            <WorkOutExerciseCard
              exercise={exercise}
              context={context}
              onDelete={onDelete}
              onEditMeta={handleEditClick}
            />
          </SortableItem>
        ))
      ) : (
        <div>{context === "search" ? "No exercises found" : "Add exercises to get started.."}</div>
      )}
      {context === "edit" && (
        <div className="text-sm text-gray-500">
          Drag and drop to reorder exercises
        </div>
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
            customDescription: selectedExercise.customDescription || selectedExercise.exercise.description,
            customBreak: selectedExercise.customBreak,
            customExecution: selectedExercise.customExecution || selectedExercise.exercise.execution,
            customRest: selectedExercise.customRest,
          }}
          onSave={async (updatedExercise) => {
            // Call the API function to update the metadata
            await onEditExerciseMeta(updatedExercise.id, {
              customRepetitions: updatedExercise.customRepetitions,
              customSets: updatedExercise.customSets,
              customDescription: updatedExercise.customDescription,
              customBreak: updatedExercise.customBreak,
              customExecution: updatedExercise.customExecution,
              customRest: updatedExercise.customRest,
            });

            // Close the modal
            setSelectedExercise(null);
          }}
        />
      )}
    </div>
  </SortableContext>
</DndContext>
  
  );
};