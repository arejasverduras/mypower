import { Exercise } from "./Exercise/Exercise"


interface ExerciseListItemsProps {
    filteredData: object[]
}


export const ExerciseListItems = ({filteredData}:ExerciseListItemsProps) => {
    const listItems = filteredData.map((item, index) => 
        <>
           <Exercise data={item} key={index}/>

        </>    
    )


    return (
        <>
            <h3 className="text-lg">ExerciseListItems</h3>
            {listItems}
        </>
    )
}