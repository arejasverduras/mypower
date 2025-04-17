export const editWorkoutExerciseMeta = async (
    workoutId: string,
    exerciseId: string,
    metadata: {
      customRepetitions: string | null;
      customSets: number | null;
      customDescription: string | null;
      customBreak: string | null;
      customExecution: string | null;
      customRest: string | null;
    }
  ) => {
    const res = await fetch(`/api/workouts/${workoutId}/edit`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exerciseId, ...metadata }),
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update exercise metadata");
    }
  
    return res.json(); // Return the updated workout
  };