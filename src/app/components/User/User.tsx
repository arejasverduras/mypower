"use client"
import { ExerciseProps } from "@/app/api/exercises/route"
import EditUserModalTest from "./EditUserModalTest/EditUserModalTest"
import Image from "next/image"
import Link from "next/link"

interface UserProps  {
    id: string,
    userData: {
        name: string,
        image: string,
        createdExercises: ExerciseProps[]
    }
    
}

export const User = ({id, userData}: UserProps) => {
    const user = userData;
    
    return (
        <>
            {user.image && <Image className="rounded-r-full my-5 " src={user.image} width='100' height='100' alt="user image"/>}
            <div className="p-4">
            <h1 className="text-2xl font-bold">{user.name || "User's Profile"}</h1>
            <EditUserModalTest userId={id}/>

            <h2 className="text-xl font-semibold mt-6">Added Exercises:</h2>
            <ul>
                {user.createdExercises.map((exercise: ExerciseProps) => (
                <li key={exercise.id} className="mt-2">
                    <Link href={`/exercises/${exercise.id}`} className="text-blue-500 hover:underline">
                    {exercise.title}
                    </Link>
                </li>
                ))}
            </ul>
            </div>
        </>
    )
}