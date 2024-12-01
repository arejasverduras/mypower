
interface ExerciseListItemsProps {
    filteredData: object[]
}


export const ExerciseListItems = ({filteredData}:ExerciseListItemsProps) => {
    const listItems = filteredData.map((item, index) => 
        <>
            listItem {index}
        </>    
    )


    return (
        <>
            <h3>ExerciseListItems</h3>
            {listItems}
        </>
    )
}