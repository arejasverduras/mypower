
import { ExerciseWithRelations } from "../../../../../types/exercise";
// import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { YouTube } from "../../Video/YouTube/YouTube";



interface WorkOutAddExerciseCardProps {
    exercise: ExerciseWithRelations;
    context:  "search" | "workOutSearch";
    onAdd: (exercise: ExerciseWithRelations) => void;
    exists: boolean;
}

export const WorkOutAddExerciseCard = ({exercise, context, onAdd, exists}: WorkOutAddExerciseCardProps) => {
    const [preview, setPreview] = useState(false);
  
    
    if (context === "workOutSearch") 
    return (
        <div className="flex flex-col items-center">
            <div className={`flex items-center ${exists ? 'bg-blue-100 ' : 'bg-headertext'} text-midnightblue p-4 rounded-lg shadow-md w-full justify-between`}>
                <div onClick={() => setPreview(!preview)}>
                    <h3 className="font-bold text-2xl cursor-pointer ">{exercise.title}</h3>

                </div>
                <div className="flex flex-col items-center justify-center">
                    {/* Tags */}
                    {/* <p className="text-description ">by {exercise.exercise.createdBy.name }</p> */}
                    {/* {exercise.customSets && exercise.customRepetitions ?
                            (   <div className="flex space-x-2 ">
                                    <p><b>Sets:</b> {exercise.customSets || null}</p>
                                    <p><b>Reps:</b> {exercise.customRepetitions}</p> 
                                    <p><b>Break: </b>2 min</p>
                                </div>
                            ): <div>{exercise.exercise.execution}</div>} */}
                    {/* glutes, quads */}
                </div>
                <div className="flex items-center space-x-4">
                    {/* buttons */}
                    {!exists &&
                        <button 
                            onClick={()=> onAdd(exercise)}
                            className="cursor-pointer rounded-lg px-2 py-1 bg-midnightblue text-white"
                            >
                            ADD
                        </button>
                     }
                    
                    {/* {like ?
                    <HeartIcon className="h-6 w-6 text-red-500 cursor-pointer" onClick={handleLike} />
                    :
                    <HeartOutline className="h-6 w-6 text-red-500 cursor-pointer" onClick={handleLike} />
                    } */}
                    <div className="flex items-center pb-2 text-lg font-bold">...</div>    
                 
                </div>
            </div>
            
            {/* Tray */}
            <div className="bg-bgblue rounded-b-lg w-11/12 cursor-pointer">
            <div className="border-l-4 border-b-4 rounded-b-lg border-b-white border-l-blue-400 ">
                {!preview ? (
                        <div 
                            className="flex justify-center items-center " onClick={() => setPreview(!preview)}>
                          <div>{exercise.execution}</div>
                            {/* <p className="text-white text-sm ">by {exercise.exercise.createdBy.name }</p> */}
                            </div>
                    ):(
                        <div className="flex flex-col justify-center py-5">
                        
                            {exercise.video && (   
                                <div className="rounded-3xl  h-80">
                                    <YouTube 
                                        embedId={exercise.video}  />
                                    </div>
                                )}
                            {exercise.image && (
                                <div className="flex justify-center">
                                    <Image 
                                        src={exercise.image} 
                                        width={300} 
                                        height={300} 
                                        alt="exercise image"
                                        className="rounded-3xl" />
                                </div>
                            )}
                            <div className="p-5 space-y-4" >
                                <p>{exercise.description}</p>
                                <div>{exercise.execution}</div>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            <div>
            </div>
        </div>
    ) 

    return <div>Wrong context {context}</div>
};