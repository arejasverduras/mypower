import { ExerciseListItems } from "./ExerciseListItems/ExerciseListItems"

const fakeData = [
    {
        title: 'Squats',
        image: '/images/exercises/JSquat.png',
        video: 'https://youtu.be/6-Pu6LhaTB8?si=4Qv7dN9saFD0Daez' 
    },
    {
        title: 'Frog',
        image: '/images/exercises/JFrog.png',
        video: 'https://youtu.be/g3hzdvUFl3o?si=TPB0fQnyspqWpLUr' 
    },
    {
        title: 'Stretch',
        image: '/images/exercises/JStretch.png',
        video: 'https://youtu.be/g3hzdvUFl3o?si=TPB0fQnyspqWpLUr' 
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