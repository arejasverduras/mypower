import { ExerciseListItems } from "./ExerciseListItems/ExerciseListItems"

import { ExerciseProps } from "./ExerciseListItems/Exercise/Exercise"

const fakeData:ExerciseProps[] = [
    {
        title: 'Squats',
        image: '/images/exercises/JSquat.png',
        // video: '6-Pu6LhaTB8?si=4Qv7dN9saFD0Daez' 
    },
    {
        title: 'Frog',
        image: '/images/exercises/JFrog.png',
        // video: 'g3hzdvUFl3o?si=TPB0fQnyspqWpLUr' 
    },
    {
        title: 'Stretch',
        image: '/images/exercises/JStretch.png',
    },
]


export const ExerciseList = () => {

    return (
        <>  
            <h2 className="text-2xl">ExerciseList</h2>
            <ExerciseListItems
                filteredData={fakeData}
            />
        </>
    )
} 