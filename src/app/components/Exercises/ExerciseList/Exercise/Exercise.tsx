'use client'
import Image from "next/image"
import Link from "next/link"
import { YouTube } from "@/app/components/Video/YouTube/YouTube"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import EditExerciseModal from "../../EditExerciseModal/EditExerciseModal"
import { useSessionContext } from "@/context/SessionContext"
import { useMessageContext } from "@/context/MessageContext"
import { BackButton } from "@/app/components/UI functions/BackButton/BackButton"
import { EditDeleteButtons } from "@/app/components/UI functions/EditDeleteButtons/EditDeleteButtons"
import { ExerciseWithRelations } from "../../../../../types/exercise"

export interface Exercise {
    exercise: ExerciseWithRelations
    index: number,
    view: "page" | "list",
}

export const Exercise = ({exercise, index, view}:Exercise) => {
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [exerciseData, setExerciseData] = useState<ExerciseWithRelations>(exercise)
    const { addMessage, setApiLoading, clearMessages} = useMessageContext();
    const { session } = useSessionContext();
    const [isAuthorized, setIsAuthorized] = useState(false);
    // const [referrer, setReferrer] = useState<string | null>(null);
    

    const router = useRouter();

    // list view toggle
    const toggle = () => {
        setOpen(!open);
    }

    // opens editing modal
    const onEdit = (id: ExerciseWithRelations["id"]) => {
        setEditingId(id);
    }

    // sets referrer for navigating back to the correct page
    // useEffect(()=>{
    //     if (document.referrer) {
    //         setReferrer(document.referrer)
    //         console.log("refererr: " + referrer);
    //     }
    // },[referrer]);
    const referrerTest = typeof document !== "undefined" ? document.referrer : "/exercises";

    useEffect(()=>{
        setIsAuthorized(
            session?.user?.id === exercise.createdById || session?.user?.isSuperuser || false
        )
    },[session, exercise.createdById])

    console.log(isAuthorized);

    // const handleBack = () => {
    //     if (referrer) {
    //       // Navigate to the previous page
    //       window.location.href = referrer;
    //     } else {
    //       // Fallback to the exercises page
    //       router.push("/exercises");
    //     }
    //   };

    // authorization for edit and delete
    // const isAuthorized = session?.id === exercise.createdById || session?.isSuperuser;

    // console.log(isAuthorized);
    // PATCH exercise (update)
    const handleSaveExercise = (updatedExercise: ExerciseWithRelations) => {
        if (!isAuthorized) {
            addMessage({type: "error", text: "You are not authorized to edit this exercise."});
            return;
          }
        
        setExerciseData(exerciseData.id === updatedExercise.id ? updatedExercise : exerciseData );
        setEditingId(null); // close modal
    };
  
     //   DELETE exercise
     const handleDeleteExercise = async (id:string) => {
        clearMessages();
        setApiLoading(true);
        if (!isAuthorized) {

            addMessage({type: "error", text: "You are not authorized to delete this exercise."});
            setApiLoading(false);
            return;
          }

        if (!confirm("Are you sure you want to delete this exercise?")) return;

        try {
          const res = await fetch(`/api/exercises/${id}`, { method: "DELETE" });
    
          if (!res.ok) {
            addMessage({type: "error", text: "Failed to delete exercise"});
            return;
          } 
          addMessage({type: "success", text: "Exercise deleted succesfully"});
            router.push("/exercises")
        } catch (err) {
          console.error(err);
          addMessage({type: "error", text: "Failed to delete exercise"});
        } finally {
            setApiLoading(false);
        }
      };


    // List view
    if (view === 'list') {
        return (
            <div className="my-5 border">
                <h4 
                    className=" p-5 cursor-pointer"
                    onClick={ toggle}>
                        {index+1}. {exerciseData.title}
                </h4>
            { open && (
                    <div className="">
                    {exerciseData.image && <Image 
                            src={exerciseData.image} 
                            alt={exerciseData.title} 
                            width="1600" 
                            height="900"
                        />}
                        {exerciseData.video && <YouTube embedId={exerciseData.video}/>}
                        {exerciseData.description && <div className="p-5">{exerciseData.description}</div>}
                        {exerciseData.execution && 
                        (<div className="p-5"><h5 className="font-bold">Execution</h5> <div>{exerciseData.execution}</div> </div>)
                            }
                        <Link href={`/exercises/${exerciseData.id}`}>
                            <button 
                                className="py-2 px-4 m-5 bg-white text-primary-color font-semibold rounded-lg shadow-md hover:bg-gray-200"
                                onClick={()=>{router.push(`/exercises/${exerciseData.id}`)}}
                            >   Read more
                            </button>
                        </Link>
                        
                    </div>)}
            </div>
        )
    }
    
    // page view
    return (
        <div className="">
            {/* <Link href={document.referrer ? document.referrer : "/exercises"}>back to exercises</Link> */}
            {/* here */}
            <BackButton fallback="/exercises"/>
            <Link href={referrerTest || "/exercises"}>
                <button 
                    className="py-2 px-4 m-5 bg-white text-primary-color font-semibold rounded-lg shadow-md hover:bg-gray-200"
                    // onClick={handleBack}
                >   Go Back to exercises
                </button>
            </Link>
            {/* <button 
                    className="py-2 px-4 m-5 bg-white text-primary-color font-semibold rounded-lg shadow-md hover:bg-gray-200"
                    onClick={handleBack}
                >   Go Back where to you came from
                </button> */}
            {/* <button onClick={()=>{router.back()}}>
                go back using router.back
            </button> */}
                     
            <h1 className="text-2xl p-5">{exerciseData.title}</h1>
            <div className="">
                   {exerciseData.image && <Image 
                        src={exerciseData.image} 
                        alt={exerciseData.title} 
                        width="1600" 
                        height="900"
                    />}
                    {exerciseData.video && <YouTube embedId={exerciseData.video}/>}
                </div>
                <div className="p-5">
                    {exercise.createdBy && (
                        <div className="text-sm my-5">
                            Added by:{" "}
                            <Link href={`/users/${exercise.createdBy.id}`} 
                                className="text-blue-500 hover:underline">
                                {exercise.createdBy.name || "Unknown User"}
                            </Link>
                        </div>
                    )}
                    <div>
                    {exerciseData.description && <div className="my-5"><h5 className="font-bold">Description</h5>{exerciseData.description}</div>}
                        {exerciseData.execution && 
                        (<div className="my-5"><h5 className="font-bold">Execution</h5> <div>{exerciseData.execution}</div> </div>)
                            }
                    </div>
                {isAuthorized && (
                    <EditDeleteButtons 
                        id={exerciseData.id} 
                        onEdit={onEdit} 
                        handleDelete={handleDeleteExercise}/>
                )}

               </div>

                    {editingId && (
              <EditExerciseModal
                exerciseId={editingId}
                onClose={()=> setEditingId(null)}
                onSave={handleSaveExercise}
              />
            )}
        </div>
    )
};
