import { ExerciseProps } from "./components/Exercises/ExerciseList/Exercise/Exercise";

export interface databaseProps {
    exercises: ExerciseProps [],
    workouts: object[]
}

const database: databaseProps = {
    exercises: [
        {
            id: 1,
            title: 'Squats',
            image: '/images/exercises/JSquat.png',
            // video: '6-Pu6LhaTB8?si=4Qv7dN9saFD0Daez' 
            description: 'Bend those knees!',
            reps: '3 x 12 reps. Hold weights if easy'
        },
        // {
        //     id: 2,
        //     title: 'Frog',
        //     image: '/images/exercises/JFrog.png',
        //     // video: 'g3hzdvUFl3o?si=TPB0fQnyspqWpLUr' 
        // },
        {
            id: 3,
            title: 'Curtsy Lunge',
            video: 'wzHjHs6jlIA?si=egKTt8NaFqiVd-DA'
        },
        {
            id: 4,
            title: 'Kettlebell Lateral Swings',
            video: 'api9BRUZ9lM?si=gxgim0Q10pmJhuJo'
        },
        {
            id: 5,
            title: 'Banded lateral walks (Monster walks)',
            video: 'rPTkrAJ6Fh4?si=1xLYttjECSvYrGk5'
        },
        {
            id: 6,
            title: 'Sumo deadlift',
            video: 'nAeklcroNUw?si=GrHuuacJ7xhBwad4'
        },
        {
            id: 7,
            title: 'bulgarian split squats',
            video: 'l246T6Zy96s?si=gvsgq0cnNsxk1zIr'
        },
        {
            id: 8,
            title: 'Bench supported glute bridge',
            video: 'LZWQgMxryDc?si=pv3P8neCufwsb8hV'
        }
    ],
    workouts: [
        {
            Id: 1,
            description: 'Monday',
            targets: ['Abs','Glutes','Back'],
            exercises: [1,4]
        }
    ]    
}

export default database;