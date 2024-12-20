import { Exercise } from "./Exercise/Exercise"
import { ExerciseProps } from "@/app/api/exercises/route"


interface ExerciseListItemsProps {
    filteredData: ExerciseProps [],
}


export const ExerciseListItems = ({filteredData}:ExerciseListItemsProps) => {

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
            {/* <h3 className="text-lg">ExerciseListItems</h3> */}
            {listItems}
        </>
    )
}