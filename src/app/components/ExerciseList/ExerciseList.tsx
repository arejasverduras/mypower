'use client'
import { useState, useEffect } from "react";
import { ExerciseListItems } from "./ExerciseListItems/ExerciseListItems";
import { ExerciseProps } from "@/app/api/exercises/route";
import { AddExerciseModal } from "./AddExerciseForm/AddExerciseForm";

export const ExerciseList = () => {
    const [exercises, setExercises] = useState<ExerciseProps[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);


     // GET exercises from the API
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch("/api/exercises", { method: "GET" });
        if (!res.ok) throw new Error("Failed to fetch exercises");
        const data = await res.json();
        setExercises(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExercises();
  }, []);

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

            if (!res.ok) throw new Error("Failed to add exercise");

            const addedExercise = await res.json();
            setExercises((prev) => [addedExercise, ...prev]);

        } catch (err) {
            console.error(err);
        }
      };

    return (
        <>  
            <h2 className="text-2xl">All exercises</h2>
            <ExerciseListItems
                filteredData={exercises}
            />
            <button
              onClick={()=> setIsModalOpen(true)}
              className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
              >
              + Add Exercise +
            </button>
            <AddExerciseModal 
              onAdd={handleAddExercise}
              isOpen={isModalOpen}
              onClose={()=> setIsModalOpen(false)}
              />
        </>
    )
};
