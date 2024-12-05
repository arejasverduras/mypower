'use client'
import Image from "next/image"
import { YouTube } from "@/app/components/Video/YouTube/YouTube"
import { useState } from "react"

export interface ExerciseProps {
        title: string,
        image: string,
        video?: string,
        description?: string,
        reps?: string,
}

interface Exercise {
    data: ExerciseProps,
    index: number,
}

export const Exercise = ({data, index}:Exercise) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    }

    return (
        <>
            <h4 
                className="my-5 border p-5 cursor-pointer"
                onClick={toggle}>
                    {index+1}. {data.title}
            </h4>
           { open && (<div className="">
                <Image 
                    src={data.image} 
                    alt={data.title} 
                    width="1600" 
                    height="900"
                />
            {data.video && <YouTube embedId={data.video}/>}
            </div>)}
        </>
    )
}