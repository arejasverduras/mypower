import { WorkoutWithRelations } from "../../../../types/workout";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { YouTube } from "../../Video/YouTube/YouTube";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { EyeIcon } from "@heroicons/react/24/outline"; // For "View exercise details"
import { LinkIcon } from "@heroicons/react/24/outline";// Icon for the "dots" menu


interface WorkOutExerciseCardProps {
    exercise: WorkoutWithRelations["exercises"][0];
    context: "view" | "edit" | "search";
    onDelete: (exerciseId: string) => void;
    onEditMeta: (exercise: WorkoutWithRelations["exercises"][0]) => void;
  
}

export const WorkOutExerciseCard = ({exercise, context, onEditMeta, onDelete}: WorkOutExerciseCardProps) => {
    const [preview, setPreview] = useState(false);
    const [like, setLike] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown visibility
    const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown menu

    

    const handleLike = () => {
        
        setLike(!like);
        setDropdownOpen(false);
    };

    const handleEditMeta = () => {
        onEditMeta(exercise);
        setDropdownOpen(false)
    }

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev); // Toggle dropdown visibility
      };

      const handleOutsideClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setDropdownOpen(false); // Close the dropdown if clicked outside
        }
      };
    
      useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      }, []);
    
    return (
        <div className="flex flex-col items-center">
           <div className="flex items-center bg-headertext text-midnightblue p-4 rounded-lg shadow-md w-full justify-between">
        <div onClick={() => setPreview(!preview)}>
          <h3 className="font-bold text-2xl cursor-pointer ">
            {exercise.customSets !== null && exercise.customSets > 0 ? `${exercise.customSets} x `  : null}  {exercise.exercise.title}
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center">
          {/* Tags */}

            {/* {exercise.customExecution || exercise.exercise.execution} */}
        </div>
        <div className="relative flex items-center space-x-4">
          {/* Like button */}
          {like ? (
            <HeartIcon
              className="h-6 w-6 text-red-500 cursor-pointer"
              onClick={handleLike}
            />
          ) : (
            <HeartOutline
              className="h-6 w-6 text-red-500 cursor-pointer"
              onClick={handleLike}
            />
          )}

          {/* Dots menu */}
          <EllipsisVerticalIcon
            className="h-6 w-6 cursor-pointer"
            onClick={toggleDropdown}
          />

             {/* Dropdown menu */}
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
            >
              <ul className="py-2">
                {/* Like option */}
                <li
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                  onClick={handleLike}
                >
                  <HeartIcon className="h-4 w-4 text-red-500" />
                  <span>{like ? "Unlike" : "Like"}</span>
                </li>
                
                {/* View exercise details */}
                <li
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                  onClick={() => {
                    setPreview(!preview);
                    setDropdownOpen(false);
                  }}
                >
                  <EyeIcon className="h-4 w-4 text-gray-500" />
                  <span>{preview? "Hide ": "View "} exercise details</span>
                </li>

                           {/* Open exercise page */}
                <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                  <LinkIcon className="h-4 w-4 text-gray-500" />
                  <Link href={`/exercises/${exercise.exercise.id}`} passHref>
                    <span>Open exercise page</span>
                  </Link>
                </li>

                {/* Edit metadata option (only in edit mode) */}
                {context === "edit" && (
                  <li
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                    onClick={handleEditMeta}
                  >
                    <PencilIcon className="h-4 w-4 text-gray-500" />
                    <span>Set custom description, sets, and reps</span>
                  </li>
                )}
                
                {/* Remove option (only in edit mode) */}
                {context === "edit" && (
                  <li
                    className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                    onClick={() => {
                      onDelete(exercise.id);
                      setDropdownOpen(false);
                    }}
                  >
                    <TrashIcon className="h-4 w-4 text-red-500" />
                    <span>Remove Exercise</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
            
            {/* Tray */}
    <div className="bg-bgblue rounded-b-lg w-11/12 cursor-pointer">
        <div className="border-l-4 border-b-4 rounded-b-lg border-b-white border-l-blue-400 ">
            {!preview ? (
                    <div 
                        className="flex justify-center items-center " onClick={() => setPreview(!preview)}>
                        {exercise.customSets || exercise.customRepetitions || exercise.customBreak ?
                            (   <div className="flex justify-center items-center space-x-6 p-2">
                                    <p><b>Sets: </b>{exercise.customSets || null}</p>
                                    <p><b>Reps: </b>{exercise.customRepetitions}</p>
                                    <p><b>Pause: </b>{exercise.customBreak || "-"}</p> 
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
                            <h4 className="font-bold mb-0 flex">Description   {context==="edit" && <PencilIcon className="h-4 w-6 text-white cursor-pointer" onClick={handleEditMeta} />}</h4>
                            <p className="mb-4 ">{exercise.customDescription || exercise.exercise.description}</p>
                            <h4 className="font-bold flex">Execution {context==="edit" && <PencilIcon className="h-4 w-6 text-white cursor-pointer" onClick={handleEditMeta} />}</h4>
                            <div className="mb-4">{exercise.customExecution || exercise.exercise.execution}</div>
                            {exercise.customSets || exercise.customRepetitions || exercise.customBreak ?
                            (   <div className="flex space-x-6">
                                    <p><b>Sets:</b> {exercise.customSets || null}</p>
                                    <p><b>Reps:</b> {exercise.customRepetitions}</p> 
                                    <p><b>Pause:</b> {exercise.customBreak || "2 min"}</p> 
                                    {context==="edit" && <PencilIcon className="h-4 w-6 text-white cursor-pointer" onClick={handleEditMeta} />}
                                </div>
                            ): (<>
                                    <div onClick={handleEditMeta} className="cursor-pointer underline mt-2">Set custom sets, reps and breaks</div>
                                </>)}
                                
                        </div>

                    </div>
                )}
                </div>
            </div>
            {/* Rest block */}
            {exercise.customRest && 
                <div className=" bg-blue-500 mt-8 rounded-lg p-2 w-1/2">
                    <p className="text-white text-lg text-center">
                        {exercise.customRest} rest
                    </p>
                </div>
            }
        </div>
    )
};