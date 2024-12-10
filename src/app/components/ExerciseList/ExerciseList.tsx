'use client'
import { useState, useEffect } from "react";

import { ExerciseListItems } from "./ExerciseListItems/ExerciseListItems";
import { ExerciseProps } from "@/app/api/exercises/route";
import { AddExerciseForm } from "./AddExerciseForm/AddExerciseForm";



export const ExerciseList = () => {
    const [exercises, setExercises] = useState<ExerciseProps[]>([]);

    useEffect(()=> {
        //fetch data fro API
        fetch("/api/exercises")
            .then((res) => res.json())
            .then((data) => setExercises(data));
    },[]);

    const handleAddExercise = async (newExercise: {
        title: string;
        image?: string;
        video?: string;
        description?: string;
        execution?: string;
      }) => {
        const res = await fetch("/api/exercises", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newExercise),
        });
    
        if (!res.ok) {
          console.error("Failed to add exercise");
          return;
        }
    
        const addedExercise = await res.json();
        setExercises([...exercises, addedExercise]);
      };

    return (
        <>  
            <h2 className="text-2xl">All exercises</h2>
            <ExerciseListItems
                filteredData={exercises}
            />
            <AddExerciseForm onAdd={handleAddExercise}/>
        </>
    )
} 
