'use client'
import { useState, useEffect } from "react";

import { ExerciseListItems } from "./ExerciseListItems/ExerciseListItems";
import { ExerciseProps } from "@/app/api/exercises/route";
import { AddExerciseForm } from "./AddExerciseForm/AddExerciseForm";
import EditExerciseModal from "./EditExerciseModal/EditExerciseModal";



export const ExerciseList = () => {
    const [exercises, setExercises] = useState<ExerciseProps[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

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

// PATCH exercise (update)
// const handleSaveExercise = (updatedExercise: ExerciseProps) => {
//   setExercises((prev) => 
//     prev.map((exercise) => 
//     exercise.id === updatedExercise.id ? updatedExercise : exercise)
// )
//   setEditingId(null); // close modal
// };

   

    return (
        <>  
            <h2 className="text-2xl">All exercises</h2>
            <ExerciseListItems
                filteredData={exercises}
                onEdit={(id) => setEditingId(id)} //open modal
            />
            {/* keep this here */}
            <AddExerciseForm onAdd={handleAddExercise}/>
            
            {/* {editingId && (
              <EditExerciseModal
                exerciseId={editingId}
                onClose={()=> setEditingId(null)}
                onSave={handleSaveExercise}
              />
            )} */}
        </>
    )
} 
