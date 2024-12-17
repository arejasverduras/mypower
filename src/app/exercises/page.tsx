'use client'
import { ExerciseList } from "../components/ExerciseList/ExerciseList"
import { useSearchParams } from "next/navigation"

export default function ExercisesPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error")

    return (
        <>
            {error === "not-found" && (
                <p className="my-5"><i>Sorry, the exercise you were looking for does not exist!</i></p>
            )}
            <h1>Page: exercises</h1>
            <ExerciseList />
        </>
        
    )
}