import { WorkoutWithRelations } from "../../../../types/workout";
// import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { YouTube } from "../../Video/YouTube/YouTube";
import { HeartIcon } from '@heroicons/react/24/solid'; 
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { TrashIcon } from '@heroicons/react/24/solid';
import {PencilIcon} from "@heroicons/react/24/solid";

interface WorkOutExerciseCardProps {
    exercise: WorkoutWithRelations["exercises"][0];
    context: "view" | "edit" | "search";
    onDelete: (exerciseId: string) => void;
    onEditMeta: (exercise: WorkoutWithRelations["exercises"][0]) => void;
  
}

export const WorkOutExerciseCard = ({exercise, context, onEditMeta, onDelete}: WorkOutExerciseCardProps) => {
    const [preview, setPreview] = useState(false);
    const [like, setLike] = useState(false);
    

    const handleLike = () => setLike(!like);

    const handleEditMeta = () => {
        onEditMeta(exercise);
    }
    
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center bg-headertext text-midnightblue p-4 rounded-lg shadow-md w-full justify-between">
                <div onClick={() => setPreview(!preview)}>
                    <h3 className="font-bold text-2xl cursor-pointer ">{context === "search" ? "searchResult":exercise.exercise.title}</h3>

                </div>
                <div className="flex flex-col items-center justify-center">
                    {/* Tags */}
                    {/* <p className="text-description ">by {exercise.exercise.createdBy.name }</p> */}
                    {/* glutes, quads */}
                </div>
                <div className="flex items-center space-x-4">
                    {/* buttons */}
                    {like ?
                    <HeartIcon className="h-6 w-6 text-red-500 cursor-pointer" onClick={handleLike} />
                    :
                    <HeartOutline className="h-6 w-6 text-red-500 cursor-pointer" onClick={handleLike} />
                    }
                    <div className="flex items-center pb-2 text-lg font-bold">...</div>    
                    {context === 'edit' && <TrashIcon className="h-6 w-6 cursor-pointer" onClick={() => onDelete(exercise.id)} />}
                </div>
            </div>
            
            {/* Tray */}
            <div className="bg-bgblue rounded-b-lg w-11/12 cursor-pointer">
            <div className="border-l-4 border-b-4 rounded-b-lg border-b-white border-l-blue-400 ">
                {!preview ? (
                        <div 
                            className="flex justify-center items-center " onClick={() => setPreview(!preview)}>
                            {exercise.customSets && exercise.customRepetitions ?
                                (   <div className="flex justify-center items-center space-x-6 p-2">
                                        <p><b>Sets: </b>{exercise.customSets || null}</p>
                                        <p><b>Reps: </b>{exercise.customRepetitions}</p>
                                        <p><b>Break: </b>2 min</p> 
                                    </div>
                                ): <div>{exercise.exercise.execution}</div>}
                                
                            {/* <p className="text-white text-sm ">by {exercise.exercise.createdBy.name }</p> */}

        
                            </div>
                    ):(
                        <div className="flex flex-col justify-center py-5 cursor-default">
                        
                            {exercise.exercise.video && (   
                                <div className="rounded-3xl  h-80">
                                    <YouTube 
                                        embedId={exercise.exercise.video}  />
                                    
                                    </div>
                                )}
                            {exercise.exercise.image && (
                                <div className="flex justify-center">
                                    <Image 
                                        src={exercise.exercise.image} 
                                        width={500} 
                                        height={300} 
                                        alt="exercise image"
                                        className="rounded-3xl w-full" />
                                </div>
                            )}
                            <div className="p-5" >
                                <h4 className="font-bold mb-0">Description</h4>
                                <p className="mb-4 ">{exercise.customDescription || exercise.exercise.description}</p>
                                {exercise.customSets && exercise.customRepetitions ?
                                (   <div className="flex space-x-2 ">
                                        <p><b>Sets:</b> {exercise.customSets || null}</p>
                                        <p><b>Reps:</b> {exercise.customRepetitions}</p> 
                                        <PencilIcon className="h-4 w-6 text-white cursor-pointer" onClick={handleEditMeta} />
                                    </div>
                                ): (<>
                                        <h4 className="font-bold">Execution</h4>
                                        <div>{exercise.exercise.execution}</div>
                                        <div onClick={handleEditMeta} className="cursor-pointer underline mt-2">Set custom sets and reps</div>
                                    </>)}
                                    
                            </div>

                        </div>
                    )}
                    </div>
                </div>
            <div>

            </div>
        </div>
    )
};