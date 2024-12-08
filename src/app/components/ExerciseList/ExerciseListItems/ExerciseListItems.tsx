import { Exercise } from "./Exercise/Exercise"
import { ExerciseProps } from "./Exercise/Exercise"

interface ExerciseListItemsProps {
    filteredData: ExerciseProps []
}

export const ExerciseListItems = ({filteredData}:ExerciseListItemsProps) => {
    const listItems = filteredData.map((item, index) => 
           <Exercise data={item} key={item.id} index={index}/>
    )


    return (
        <>
            {/* <h3 className="text-lg">ExerciseListItems</h3> */}
            {listItems}
        </>
    )
}