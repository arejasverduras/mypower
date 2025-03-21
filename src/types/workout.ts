import {
    Workout,
    WorkoutExercise,
    Exercise,
    Tag,
    User,
    LikedItem,
    ProgramWorkout,
    ExerciseResult,
  } from "@prisma/client";
  
  // Extend the base `Workout` type to include full nested relations
  export type WorkoutWithRelations = Workout & {
    exercises: (WorkoutExercise & {
      exercise: Exercise & {
        createdBy: User
        results: ExerciseResult[]; // Include results for each exercise
      };
    })[];
    tags: Tag[];
    createdBy: User; // Include the full User object
    likedBy: LikedItem[];
    programs: ProgramWorkout[]; // Include programs that reference this workout
  };
  