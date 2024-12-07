'use client'
import { useState, useEffect } from "react";

import { ExerciseListItems } from "./ExerciseListItems/ExerciseListItems";



export const ExerciseList = ({filteredData}) => {
    const [exercises, setExercises] = useState([]);

    useEffect(()=> {
        //fetch data fro API
        fetch("/api/exercises")
            .then((res) => res.json())
            .then((data) => setExercises(data));
    },[])

    return (
        <>  
            <h2 className="text-2xl">ExerciseList</h2>
            <ExerciseListItems
                filteredData={exercises}
            />
        </>
    )
} 
