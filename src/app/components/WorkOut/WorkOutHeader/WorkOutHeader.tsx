"use client"
import { WorkoutWithRelations } from "../../../../../types/workout"
import Link from "next/link";
import Image from "next/image";
import userPlaceholderImage from "../../../../../public/images/JaraFitM.png";
import { EditDeleteButtons } from "../../UI functions/EditDeleteButtons/EditDeleteButtons";
import { useSession } from "@/context/SessionContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Error } from "../../UI functions/Error/Error";


export const WorkOutHeader = ({workout}: {workout: WorkoutWithRelations}) => {
    const [error, setError] = useState("");
    const {session} = useSession();
    const router = useRouter();

    const creatorOrSuper = session?.id === workout.createdBy.id || session?.isSuperuser;

    const handleEdit = () => null;

    //   DELETE exercise
    const handleDelete = async (id:string) => {
        setError("");

        if (!creatorOrSuper) {
            setError("You are not authorized to delete this workout.");
            return;
            }
    
        if (!confirm("Are you sure you want to delete this workout?")) return;
    
        try {
            const res = await fetch(`/api/workout/${id}/edit`, { method: "DELETE" });
    
            if (!res.ok) {
                setError("Failed to delete workout");
                return;
            }
            
            alert("User deleted successfully");
            router.push("/workouts")
        } catch (err) {
            console.error(err);
            setError("Failed to delete workout.");
            return;
        }
        };


    return (
            <>
                <section className="flex flex-col items-start space-y-2 mt-5 shadow-md shadow-midnightblue rounded-lg">
                        {/* <Image 
                            src={workout.image || '/images/JaraFitM.png'} 
                            width='600' 
                            height='477' 
                            alt='Jara at the beach'
                            className="rounded-r-full mr-5 "
                            >
                        </Image> */}

                    <div className="p-4 space-y-2">
                        <h1 className="underline">{workout.title || "My workout"}</h1>
                        <div className="flex items-center width-full space-x-2">
                            <Image src={workout.createdBy.image || userPlaceholderImage } 
                                    alt={workout.createdBy.name || workout.createdBy.id} 
                                    width={25} 
                                    height={25}
                                    className="rounded-full" />
                            <Link href={`/users/${workout.createdBy.id}`}>{workout.createdBy.name}</Link>
                            <div className="font-bold">*</div>
                            <div>{`${workout.exercises?.length} exercises` || "empty workout"}</div>
                            <div className="font-bold">*</div>
                            <div className="flex flex-wrap">
                            {workout.tags.map((tag, index) => (
                                <span key={index} className="flex items-center">
                                <Link href={`/tag/${tag.id}`}>
                                    {tag.name}
                                </Link>
                                {index < workout.tags.length - 1 && <span>,&nbsp;</span>}
                                </span>
                            ))}
                            </div>
                        </div>
                        <p className="text-blue-400">{workout.description || "Add a description"}</p>
                    </div>
                </section>
                <section>
                    {/* Like heart */}
                    {/* dot menu with sharing functions*/}
                    <div className="flex flex-col space-y-4 py-4 shadow-md shadow-midnightblue rounded-lg">
                        {error && <Error error={error} />}
                        {session && 
                            <div className="px-4">
                                <EditDeleteButtons 
                                    id={workout.id} 
                                    onEdit={handleEdit} 
                                    handleDelete={handleDelete} 
                                />
                            </div>
                            }
                    </div>
                </section>
            </>
    )
};

