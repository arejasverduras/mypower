import { WorkoutWithRelations } from "../../../../../types/workout"
import Link from "next/link";
import Image from "next/image";
import userPlaceholderImage from "../../../../../public/images/JaraFitM.png"


export const WorkOutHeader = ({workout}: {workout: WorkoutWithRelations}) => {

    return (
            <section className="flex flex-col items-start space-y-2">
                <h1 className="underline">{workout.title || "My workout"}</h1>
                <div className="flex items-center width-full space-x-2">
                    <Image src={workout.createdBy.image || userPlaceholderImage } 
                            alt={workout.createdBy.name || workout.createdBy.id} 
                            width={25} 
                            height={25}
                            className="rounded-full" />
                    <Link href={`/users/${workout.createdBy.id}`}>{workout.createdBy.name}</Link>
                </div>
                <p className="text-blue-400">{workout.description || "Add a description"}</p>
                 <div className="flex flex-wrap text-blue-200">
                    {workout.tags.map((tag, index) => (
                        <span key={index} className="flex items-center">
                        <Link href={`/tag/${tag.id}`}>
                            {tag.name}
                        </Link>
                        {index < workout.tags.length - 1 && <span>,&nbsp;</span>}
                        </span>
                    ))}
                </div>
            </section>
    )
};

