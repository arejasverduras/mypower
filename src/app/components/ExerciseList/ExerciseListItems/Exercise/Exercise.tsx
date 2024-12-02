import Image from "next/image"

export interface ExerciseProps {
        title: string,
        image: string,
        video: string,
}

interface Exercise {
    data: ExerciseProps,
    index: number,
}

export const Exercise = ({data, index}:Exercise) => {

    return (
        <div className="my-5 ">
            <h4>{index+1}. {data.title}</h4>
            <Image 
                src={data.image} 
                alt={data.title} 
                width="1600" 
                height="900"
            />
            {data.video}
        </div>
    )
}