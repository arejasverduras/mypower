'use client'
import Image from "next/image"
import { YouTube } from "@/app/components/Video/YouTube/YouTube"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ExerciseProps } from "@/app/api/exercises/route"
import EditExerciseModal from "../../EditExerciseModal/EditExerciseModal"



interface Exercise {
    exercise: ExerciseProps,
    index: number,
    view: "page" | "list",
}

export const Exercise = ({exercise, index, view}:Exercise) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [exerciseData, setExerciseData] = useState<ExerciseProps>(exercise)

    // list view toggle
    const toggle = () => {
        setOpen(!open);
    }

    // opens editing modal
    const onEdit = (id: ExerciseProps["id"]) => {
        setEditingId(id);
        console.log(editingId);
    }

    // PATCH exercise (update)
    const handleSaveExercise = (updatedExercise: ExerciseProps) => {
        setExerciseData(exerciseData.id ===updatedExercise.id ? updatedExercise : exerciseData );
        setEditingId(null); // close modal
    };
  

     //   DELETE exercise
     const handleDeleteExercise = async (id:number) => {
        if (!confirm("Are you sure you want to delete this exercise?")) return;

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
                    </div>)}
                    
            </div>
        )
    }
    
    // page view
    return (
        <>
                <h1 className="text-2xl">{exerciseData.title}</h1>
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
                </div>)
                <button
                        onClick={() => onEdit(exerciseData.id)}
                        className="text-blue-400 hover:text-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDeleteExercise(exerciseData.id)}
                        className="text-red-500 hover:text-red-700"
                            > Delete 
                    </button>
                    {editingId && (
              <EditExerciseModal
                exerciseId={editingId}
                onClose={()=> setEditingId(null)}
                onSave={handleSaveExercise}
              />
            )}
        </>
    )
};
