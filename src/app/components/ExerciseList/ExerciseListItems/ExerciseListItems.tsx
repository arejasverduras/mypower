import { Exercise } from "./Exercise/Exercise"
import { ExerciseProps } from "@/app/api/exercises/route"
import { Dispatch, SetStateAction } from "react"

interface ExerciseListItemsProps {
    filteredData: ExerciseProps [],
    // setExercises: Dispatch<SetStateAction<ExerciseProps[]>>,
    handleDeleteExercise: (id: number) => Promise<void>
}


export const ExerciseListItems = ({filteredData, handleDeleteExercise}:ExerciseListItemsProps) => {
    // DELETE exercise
 
    
    
    const listItems = filteredData.map((item, index) => 
           <Exercise 
                data={item} 
                key={item.id} 
                index={index}
                // setExercises={setExercises}
                handleDeleteExercise={handleDeleteExercise}
                />
    )


    return (
        <>
            {/* <h3 className="text-lg">ExerciseListItems</h3> */}
            {listItems}
        </>
    )
}