import { Exercise } from "./Exercise/Exercise"
import { ExerciseWithRelations } from "../../../../../types/exercise"

interface ExerciseListItemsProps {
    filteredData: ExerciseWithRelations [],
}

export const ExerciseList = ({filteredData}:ExerciseListItemsProps) => {

    const listItems = filteredData.map((item, index) => 
           <Exercise 
                exercise={item} 
                key={item.id} 
                index={index}
                view="list"
                
                />
    )

    return (
        <>
            <h2>Exercise List</h2>
            <ul id="exercise-list-items">
                {listItems}
            </ul>
            
        </>
    )
};
