import { Exercise } from "./Exercise/Exercise"
import { ExerciseProps } from "@/app/api/exercises/route"


interface ExerciseListItemsProps {
    filteredData: ExerciseProps [],
    onEdit: (id: number) => void;
}


export const ExerciseListItems = ({filteredData, onEdit}:ExerciseListItemsProps) => {

    const listItems = filteredData.map((item, index) => 
           <Exercise 
                exercise={item} 
                key={item.id} 
                index={index}
                view="list"
                // setExercises={setExercises}
                onEdit={onEdit}
                />
    )


    return (
        <>
            {/* <h3 className="text-lg">ExerciseListItems</h3> */}
            {listItems}
        </>
    )
}