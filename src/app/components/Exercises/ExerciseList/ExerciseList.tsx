import { Exercise } from "./Exercise/Exercise"
import { ExerciseWithRelations } from "../../../../../types/exercise"

export const ExerciseList = ({exercises}: {exercises: ExerciseWithRelations[]}) => {

    const listItems = exercises.map((item, index) => 
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
