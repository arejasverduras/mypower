'use client'
import Image from "next/image"
import { YouTube } from "@/app/components/Video/YouTube/YouTube"
import { Dispatch, SetStateAction, useState } from "react"
import { ExerciseProps } from "@/app/api/exercises/route"


interface Exercise {
    data: ExerciseProps,
    index: number,
    handleDeleteExercise: (id: number) => Promise<void>
}

export const Exercise = ({data, index, handleDeleteExercise}:Exercise) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    }

    return (
        <div className="my-5 border">
            <h4 
                className=" p-5 cursor-pointer"
                onClick={toggle}>
                    {index+1}. {data.title}
            </h4>
           { open && (
                <div className="">
                   {data.image && <Image 
                        src={data.image} 
                        alt={data.title} 
                        width="1600" 
                        height="900"
                    />}
                    {data.video && <YouTube embedId={data.video}/>}
                    {data.description && <div className="p-5">{data.description}</div>}
                    {data.execution && 
                       (<div className="p-5"><h5 className="font-bold">Execution</h5> <div>{data.execution}</div> </div>)
                        }
                </div>)}
                <button
              onClick={() => handleDeleteExercise(data.id)}
              className="text-red-500 hover:text-red-700"
                > Delete 
                </button>
        </div>
    )
}