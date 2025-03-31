"use client"
import { EditUserModal } from "./EditUserModal/EditUserModal"
import { EditDeleteButtons } from "../UI functions/EditDeleteButtons/EditDeleteButtons"
import Image from "next/image"
import Link from "next/link"
import { useSessionContext } from "@/context/SessionContext"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { User as UserType } from "@prisma/client"
import { ExerciseWithRelations } from "../../../types/exercise"
import { useMessageContext } from "@/context/MessageContext"

interface UserProps  {
    id: string,
    data: UserType & {createdExercises: ExerciseWithRelations[]}    
}

export const User = ({id, data}: UserProps) => {
    const [userData, setUserData] = useState(data);
    const [editingId, setEditingId] = useState<string | null>(null);
    const {session} = useSessionContext();
    const { addMessage, setApiLoading, clearMessages } = useMessageContext();
    const router = useRouter();

    const isAuthorized = session?.user?.id === id || session?.user?.isSuperuser;

    // triggers editing modal
    const onEdit = (id: ExerciseWithRelations["id"]) => {
        setEditingId(id);
        console.log("id " + editingId)
    }

    const onClose = () => setEditingId(null);
    // PATCH user (update)
    const handleSaveExercise = (updatedUser: UserProps["data"]& {createdExercises: ExerciseWithRelations[]}) => {
        if (!session) {
            addMessage({type: "error", text: "You are not authorized to edit this exercise."});
            return;
            }
        
        setUserData(userData.id === updatedUser.id ? updatedUser : userData );
        setEditingId(null); // close modal
    };

    //   DELETE user
    const handleDeleteUser = async (id:string) => {
        clearMessages();
       
    if (!isAuthorized) {
        addMessage({type: "error", text: "You are not authorized to delete this user."});
        return;
        }

    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
        setApiLoading(true);
        const res = await fetch(`/api/users/${id}/edit`, { method: "DELETE" });

        if (!res.ok) {
            const errorData = await res.json();
            addMessage({type: "error", text: errorData.message || "Failed to delete user."});
            return;
        }
        addMessage({type: "success", text: "User deleted successfully."});
        router.push("/users");
    } catch (err) {
        console.error(err);
        addMessage({type: "error", text: "Failed to delete user."});
    } finally {
        setApiLoading(false);
    }
    };
    
    return (
        <>
            {userData.image && <Image className="rounded-r-full my-5 " src={userData.image} width='100' height='100' alt="user image"/>}
            <div className="p-4">
                <h1 className="my-5">{userData.name || "User's Profile"}</h1>
                <p className="italic ">&quot;{userData.quote}&quot;</p>
                {userData.bio && <p className="my-5  rounded-md">{userData.bio}</p>}
                
                {isAuthorized &&
                    <EditDeleteButtons
                    id={id}
                    onEdit={onEdit}
                    handleDelete={handleDeleteUser}
                    />
                }
                <h2 className="text-xl font-semibold mt-6">Added Exercises:</h2>
                <ul>
                    {userData.createdExercises.map((exercise: ExerciseWithRelations) => (
                    <li key={exercise.id} className="mt-2">
                        <Link href={`/exercises/${exercise.id}`} className="text-blue-500 hover:underline">
                        {exercise.title}
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
            {editingId && (
              <EditUserModal
                userId={editingId}
                onClose={onClose}
                onSave={handleSaveExercise}
              />
            
            )}
        </>
    )
}