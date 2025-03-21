import { WorkoutWithRelations } from "../../../../types/workout";
import { WorkOutCard } from "../WorkOutCard/WorkOutCard";

export const WorkOutList = ({ workouts }: {workouts: WorkoutWithRelations[]}) => {  

    return (
        <div className="bg-background min-h-screen p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-heading text-headertext font-bold mb-6 text-center sm:text-left">All Workouts</h1>
                {workouts.length === 0 ? (
                <p className="text-gray-500 text-center">No workouts found</p>
                    ) : (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {workouts.map(workout => (
                            <WorkOutCard key={workout.id} workout={workout} />
                        ))}
                    </div>
                    )}
          </div>
        </div>
      );
};
