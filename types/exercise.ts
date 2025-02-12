import {
    Exercise,
    WorkoutExercise,
    ExerciseResult,
    Tag,
    User,
    LikedItem,
  } from "@prisma/client";
  
  // Extend the base `Exercise` type to include full nested relations
  export type ExerciseWithRelations = Exercise & {
    workouts: (WorkoutExercise & {
      workout: {
        id: string;
        title: string;
      };
    })[];
    tags: Tag[];
    createdBy: User; // Include the full User object
    likedBy: LikedItem[];
    results: ExerciseResult[]; // Include results for each exercise
  };