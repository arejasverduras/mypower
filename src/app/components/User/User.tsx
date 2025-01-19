"use client"
import { ExerciseProps } from "@/app/api/exercises/route"
// import EditUserModalTest from "./EditUserModalTest/EditUserModalTest"
import { EditUserModal } from "./EditUserModal/EditUserModal"
import { EditDeleteButtons } from "../UI functions/EditDeleteButtons/EditDeleteButtons"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "@/context/SessionContext"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { User as UserType } from "@prisma/client"

interface UserProps  {
    id: string,
    data: UserType & {createdExercises: ExerciseProps[]}    
}

export const User = ({id, data}: UserProps) => {
    const [userData, setUserData] = useState(data);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    

    const {session, loading} = useSession();
    const router = useRouter();

    const isAuthorized = session?.id === id || session?.isSuperuser;

    // triggers editing modal
    const onEdit = (id: ExerciseProps["id"]) => {
        setEditingId(id);
        console.log("id " + editingId)
    }

    const onClose = () => setEditingId(null);
    // PATCH exercise (update)
    const handleSaveExercise = (updatedUser: UserProps["data"]& {createdExercises: ExerciseProps[]}) => {
        if (!session) {
            setError("You are not authorized to edit this exercise.");
            return;
            }
        
        setUserData(userData.id === updatedUser.id ? updatedUser : userData );
        setEditingId(null); // close modal
    };

    //   DELETE exercise
    const handleDeleteUser = async (id:string) => {

    if (!isAuthorized) {
        setError("You are not authorized to delete this user.");
        return;
        }

    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
        const res = await fetch(`/api/users/${id}/edit`, { method: "DELETE" });

        if (!res.ok) throw new Error("Failed to delete user");
        
        alert("User deleted successfully");
        router.push("/users")
    } catch (err) {
        console.error(err);
        alert("Failed to delete user.");
    }
    };
    
    return (
        <>
            {userData.image && <Image className="rounded-r-full my-5 " src={userData.image} width='100' height='100' alt="user image"/>}
            <div className="p-4">
                <h1 className="text-2xl font-bold my-5">{userData.name || "User's Profile"}</h1>
                <p className="italic ">"{userData.quote}"</p>
                {userData.bio && <p className="my-5  rounded-md">{userData.bio}</p>}
                
                {isAuthorized &&
                    <EditDeleteButtons
                    id={id}
                    onEdit={onEdit}
                    handleDelete={handleDeleteUser}
                    />
                }
                {error && <div className="text-red-500">{error}</div>}
                <h2 className="text-xl font-semibold mt-6">Added Exercises:</h2>
                <ul>
                    {userData.createdExercises.map((exercise: ExerciseProps) => (
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