import { WorkoutWithRelations } from "../../../../types/workout";
// import Link from "next/link";
import Image from "next/image";
import { useState } from "react";


export const WorkOutExerciseCard = ({exercise}:{exercise: WorkoutWithRelations["exercises"][0]}) => {
    const [preview, setPreview] = useState(false);
    console.log(exercise);
    
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center bg-headertext text-midnightblue p-4 rounded-lg shadow-md w-full justify-between">
                <div onClick={() => setPreview(!preview)}>
                    <h3 className="font-bold text-2xl cursor-pointer ">{exercise.exercise.title}</h3>

                </div>
                <div className="flex flex-col items-center justify-center">
                    {/* Tags */}
                    <p>by {exercise.exercise.createdBy.name }</p>

                    {/* Tags, tags */}
                </div>
                <div>
                    {/* buttons */}
                    heart ...
                </div>
            </div>
            {!preview ? (
                    <div 
                        className="flex justify-center bg-bgblue rounded-b-lg w-11/12 cursor-pointer" onClick={() => setPreview(!preview)}>
                        collapsed
                        </div>
                ):(
                    <div className="flex justify-center bg-bgblue rounded-b-lg w-11/12">
                        expanded
                        {exercise.exercise.image && (
                            <div className="flex justify-center">
                                <Image 
                                    src={exercise.exercise.image} 
                                    width={300} 
                                    height={300} 
                                    alt="exercise image"
                                    className="rounded-3xl" />
                            </div>
                        )}
                    </div>
                )}
            <div>

            </div>
        </div>
    )
};