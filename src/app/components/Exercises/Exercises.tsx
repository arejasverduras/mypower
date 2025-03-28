'use client'
import { useState, useEffect } from "react";
import { ExerciseList } from "./ExerciseList/ExerciseList";
import { ExerciseWithRelations } from "../../../types/exercise";
import { AddExerciseModal } from "./AddExerciseForm/AddExerciseForm";;
import { useSessionContext } from "@/context/SessionContext";
import { useMessageContext } from "@/context/MessageContext";
import { SearchBar } from "../UI functions/SearchBar/SearchBar";


export const Exercises = () => {
    const [exercises, setExercises] = useState<ExerciseWithRelations[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { session, loading } = useSessionContext();
    const { addMessage, setApiLoading, clearMessages } = useMessageContext();
    const [search, setSearch] = useState('');

     // GET exercises from the API
  useEffect(() => {
    clearMessages();
    setApiLoading(true);
    
    const fetchExercises = async () => {
      try {
        const res = await fetch("/api/exercises", { method: "GET" });
        if (!res.ok)  {
          addMessage({ type: "error", text: "Failed to load exercises" });
          // setErrors((prev) => [...prev, "Failed to load exercises"]);
          return;
        }
        const data = await res.json();
        setExercises(data);
        addMessage({ type: "success", text: "Exercise loaded successfully" });
      } catch (err) {
        console.error(err);
        // setErrors((prev) => [...prev, "Failed to load exercises"]);
        addMessage({ type: "error", text: "Failed to load exercises" });
      } finally {
        setApiLoading(false);
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
        clearMessages();
        setApiLoading(true);
        try {
            const res = await fetch("/api/exercises", {
                method: "POST",
                headers: { "Content-Type": "application/json"}, 
                body: JSON.stringify(newExercise),
            });

            if (!res.ok) 
              {
                addMessage({ type: "error", text: "API: Failed to add exercise" });
                // setErrors((prev) => [...prev, "API: Failed to add exercises"]);
                return;
              };
            const addedExercise = await res.json();
            setExercises((prev) => [addedExercise, ...prev]);
            addMessage({ type: "success", text: "Exercise added successfully" });
        } catch (err) {
            console.error(err);
            addMessage({ type: "error", text: "Failed to add exercise" });
        } finally {
          setApiLoading(false);
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

    return (
      <div className="bg-background min-h-screen p-6">
        
        <div className="max-w-4xl mx-auto"> 
        
            <h2 className="text-2xl">Browse exercises</h2>
            {!loading && exercises.length === 0 && <p>No exercises available</p>}
            
            <SearchBar search={search} setSearch={setSearch} placeholderText="Search exercises..." />
            {/* <Errors errors={errors} /> */}
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
