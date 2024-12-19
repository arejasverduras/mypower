'use client'
import Image from "next/image"
import { YouTube } from "@/app/components/Video/YouTube/YouTube"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ExerciseProps } from "@/app/api/exercises/route"



interface Exercise {
    exercise: ExerciseProps,
    index: number,
    view: "page" | "list",
}

export const Exercise = ({exercise, index, view}:Exercise) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    // const [isEditing, setIsEditing] = useState(false);

    const toggle = () => {
        setOpen(!open);
    }

    // const onEdit = ()=> !setIsEditing;

     //   DELETE exercise
     const handleDeleteExercise = async (id:number) => {
        if (!confirm("Are you sure you want to delete this exercise?")) return;
        // console.log(id)
        try {
          const res = await fetch(`/api/exercises/${id}`, { method: "DELETE" });
    
          if (!res.ok) throw new Error("Failed to delete exercise");
            
          alert("Exercise deleted successfully");
            router.push("/exercises")
        } catch (err) {
          console.error(err);
          alert("Failed to delete exercise.");
        }
      };

    // List view
    if (view === 'list') {
        return (
            <div className="my-5 border">
                <h4 
                    className=" p-5 cursor-pointer"
                    onClick={ toggle}>
                        {index+1}. {exercise.title}
                </h4>
            { open && (
                    <div className="">
                    {exercise.image && <Image 
                            src={exercise.image} 
                            alt={exercise.title} 
                            width="1600" 
                            height="900"
                        />}
                        {exercise.video && <YouTube embedId={exercise.video}/>}
                        {exercise.description && <div className="p-5">{exercise.description}</div>}
                        {exercise.execution && 
                        (<div className="p-5"><h5 className="font-bold">Execution</h5> <div>{exercise.execution}</div> </div>)
                            }
                    </div>)}
                    
            </div>
        )
    }
    
    // page view
    return (
        <>
                <h1 className="text-2xl">{exercise.title}</h1>
            <div className="">
                   {/* {exercise.image && <Image 
                        src={exercise.image} 
                        alt={exercise.title} 
                        width="1600" 
                        height="900"
                    />} */}
                    {exercise.video && <YouTube embedId={exercise.video}/>}
                    {exercise.description && <div className="p-5">{exercise.description}</div>}
                    {exercise.execution && 
                       (<div className="p-5"><h5 className="font-bold">Execution</h5> <div>{exercise.execution}</div> </div>)
                        }
                </div>)
                <button
                        onClick={() => onEdit(exercise.id)}
                        className="text-blue-400 hover:text-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDeleteExercise(exercise.id)}
                        className="text-red-500 hover:text-red-700"
                            > Delete 
                    </button>
        </>
    )
}

// to do next: handle edit functionality!