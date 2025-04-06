import { WorkoutWithRelations } from "../../../../types/workout";
import { WorkOutHeader } from "../../WorkOut/WorkOutHeader/WorkOutHeader";

export const WorkOutList = ({
  workouts,
  onUpdate,
  onDelete,
}: {
  workouts: WorkoutWithRelations[];
  onUpdate: (updatedWorkout: WorkoutWithRelations) => void;
  onDelete: (deletedWorkoutId: string) => void;
}) => {
  return (
    <div className="w-full min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-heading text-headertext font-bold mb-6 text-center sm:text-left">
          All Workouts
        </h1>
        {workouts.length === 0 ? (
          <p className="text-gray-500 text-center">No workouts found</p>
        ) : (
          <div className="mt-6">
            {workouts.map((workout) => (
              <WorkOutHeader
                key={workout.id}
                workout={workout}
                context="list"
                onUpdate={onUpdate} // Pass the onUpdate function from the parent
                onDelete={onDelete} // Pass the onDelete function from the parent
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};