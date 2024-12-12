'use client'
import { useState, useEffect } from "react";

import { ExerciseListItems } from "./ExerciseListItems/ExerciseListItems";
import { ExerciseProps } from "@/app/api/exercises/route";
import { AddExerciseForm } from "./AddExerciseForm/AddExerciseForm";



export const ExerciseList = () => {
    const [exercises, setExercises] = useState<ExerciseProps[]>([]);


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

    //   DELETE exercise
      const handleDeleteExercise = async (id: number) => {
        if (!confirm("Are you sure you want to delete this exercise?")) return;
        console.log(id)
        try {
          const res = await fetch(`/api/exercises/${id}`, { method: "DELETE" });
    
          if (!res.ok) throw new Error("Failed to delete exercise");
    
          setExercises((prev) => prev.filter((exercise) => exercise.id !== id));
        } catch (err) {
          console.error(err);
        }
      };

    return (
        <>  
            <h2 className="text-2xl">All exercises</h2>
            <ExerciseListItems
                filteredData={exercises}
                handleDeleteExercise={handleDeleteExercise}
            />
            <AddExerciseForm onAdd={handleAddExercise}/>
        </>
    )
} 
