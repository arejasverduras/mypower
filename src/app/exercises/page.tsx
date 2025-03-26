'use client'
import { Exercises } from "../components/Exercises/Exercises"
import { useSearchParams } from "next/navigation"

export default function ExercisesPage() {
    const searchParams = useSearchParams();
    const error = searchParams?.get("error")


    return (

        <div className="bg-background min-h-screen p-6">
                {error === "not-found" && (
                    <p className="my-5"><i>Sorry, the exercise you were looking for does not exist!</i></p>
                )}

                <h1>Page: exercises</h1>
                <Exercises />
         
        </div>
        
    )
}