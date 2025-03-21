'use client'
import { useState, useEffect } from "react";
import { ExerciseList } from "./ExerciseList/ExerciseList";
import { ExerciseWithRelations } from "../../../types/exercise";
import { AddExerciseModal } from "./AddExerciseForm/AddExerciseForm";;
import { useSessionContext } from "@/context/SessionContext";
import { SearchBar } from "../UI functions/SearchBar/SearchBar";

export const Exercises = () => {
    const [exercises, setExercises] = useState<ExerciseWithRelations[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { session, loading} = useSessionContext();
    const [search, setSearch] = useState('');

     // GET exercises from the API
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch("/api/exercises", { method: "GET" });
        if (!res.ok)  {
          setError("Failed to load exercises");
          return;
        }
        const data = await res.json();
        setExercises(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load exercises");
      }
    };

    fetchExercises();
  }, []);



const checkForSignIn = () => {
  if (!session) {
    alert("You must be signed in to add an exercise")
  } else {
    setIsModalOpen(true)
  }
}

//   POST exercise
    const handleAddExercise = async (newExercise: {
        title: string;
        image?: string;
        video?: string;
        description?: string;
        execution?: string;
      }) => {

        try {
            const res = await fetch("/api/exercises", {
                method: "POST",
                headers: { "Content-Type": "application/json"}, 
                body: JSON.stringify(newExercise),
            });

            if (!res.ok) throw new Error("Failed to add exercise client");

            const addedExercise = await res.json();
            setExercises((prev) => [addedExercise, ...prev]);

        } catch (err) {
            console.error(err);
        }
      };

    const lowerCaseSearch = search.toLowerCase();

    const filteredExercises = exercises.filter(exercise =>
      exercise.title.toLowerCase().includes(lowerCaseSearch) ||
      exercise.description?.toLowerCase().includes(lowerCaseSearch) ||
      exercise.tags?.some(tag => tag.name.toLowerCase().includes(lowerCaseSearch)) ||
      exercise.createdBy?.name?.toLowerCase().includes(lowerCaseSearch) ||
      exercise.workouts?.some(workoutExercise => workoutExercise.workout.title.toLowerCase().includes(lowerCaseSearch))
  );

  console.log(exercises);


    return (
      <div className="bg-background min-h-screen p-6">
        <div className="max-w-4xl mx-auto"> 
            <h2 className="text-2xl">All exercises</h2>
            {exercises.length === 0 && <p>No exercises available</p>}
            {error && <p>{error}</p>}
            <SearchBar search={search} setSearch={setSearch} placeholderText="Search exercises..." />
            <ExerciseList
                exercises={filteredExercises}
            />
            <button
              onClick={checkForSignIn}
              className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
              >
              + Add Exercise +
            </button>
            <AddExerciseModal 
              onAdd={handleAddExercise}
              isOpen={isModalOpen}
              onClose={()=> setIsModalOpen(false)}
              />
              {loading && <div className="w-full h-full bg-black backdrop-blur-3xl">Loading..</div>}
          </div>
        </div>
    )
};
