"use client";
import { WorkoutWithRelations } from "../../../../types/workout";
import Link from "next/link";
import Image from "next/image";
import userPlaceholderImage from "../../../../../public/images/JaraFitM.png";
import { EditDeleteButtons } from "../../UI functions/EditDeleteButtons/EditDeleteButtons";
import { useSessionContext } from "@/context/SessionContext";
import { useRouter } from "next/navigation";
import { useMessageStore } from "@/stores/apiMessageStore";
import { useState } from "react";
import { EditWorkOutMetaModal } from "../EditWorkOutMetaModal/EditWorkOutMetaModal";

export const WorkOutHeader = ({
  workout,
  context,
  onUpdate,
  onDelete,
}: {
  workout: WorkoutWithRelations;
  context: "list" | "page";
  onUpdate: (updatedWorkout: WorkoutWithRelations) => void;
  onDelete?: (deletedWorkoutId: string) => void;
}) => {
  const { session } = useSessionContext();
  const { addMessage, setApiLoading, clearMessages } = useMessageStore();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dotMenuOpen, setDotMenuOpen] = useState(false);

  const handleDotMenuClick = () => {
    setDotMenuOpen(!dotMenuOpen);
  };

  const handleDotMenuClose = () => {
    setDotMenuOpen(false);
  };

  const creatorOrSuper =
    session?.user?.id === workout.createdBy.id || session?.user?.isSuperuser;

  // EDIT workout metadata
  const handleEdit = () => {
    clearMessages();
    if (!creatorOrSuper) {
      addMessage({ type: "error", text: "You are not authorized to edit this workout." });
      return;
    }
    setIsModalOpen(true);
  };

  const onClose = async () => {
    setIsModalOpen(false);
    

    try {
      const res = await fetch(`/api/workouts/${workout.id}`);
      if (res.ok) {
        const updatedWorkout = await res.json();
        onUpdate(updatedWorkout); // Notify parent about the update
        addMessage({ type: "success", text: "Workout updated successfully" });
      } else {
        console.error("Failed to fetch updated workout data");
        addMessage({ type: "error", text: "Failed to fetch updated workout data" });
      }
    } catch (error) {
      console.error("Error fetching updated workout data:", error);
      addMessage({ type: "error", text: "Error fetching updated workout data" });
    }
  };

  // DELETE workout
  const handleDelete = async (id: string) => {
    clearMessages();

    if (!creatorOrSuper) {
      addMessage({ type: "error", text: "You are not authorized to delete this workout." });
      return;
    }

    if (!confirm("Are you sure you want to delete this workout?")) return;

    try {
      setApiLoading(true);
      const res = await fetch(`/api/workouts/${id}`, { method: "DELETE" });

      if (!res.ok) {
        addMessage({ type: "error", text: "Failed to delete workout" });
        return;
      }

      addMessage({ type: "success", text: "Workout deleted successfully" });
      if (onDelete) onDelete(id); // Notify parent about the deletion
      if (context === "page") router.push("/workouts");
    } catch (err) {
      console.error(err);
      addMessage({ type: "error", text: "Failed to delete workout" });
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <>
      <section className="flex flex-col items-start space-y-2 mt-5 shadow-md shadow-midnightblue rounded-lg">
        <div className="p-4 space-y-2">
          {context === "list" ? (
            <Link href={`/workouts/${workout.id}`}>
              <h2 className="text-4xl font-bold underline cursor-pointer">
                {workout.title || "My workout"}
              </h2>
            </Link>
          ) : (
            <h1 onClick={handleEdit} className="underline cursor-pointer">
              {workout.title || "My workout"}
            </h1>
          )}
          <div className="flex items-center width-full space-x-2">
            <Image
              src={workout.createdBy.image || userPlaceholderImage}
              alt={workout.createdBy.name || workout.createdBy.id}
              width={25}
              height={25}
              className="rounded-full"
            />
            <Link href={`/users/${workout.createdBy.id}`}>
              {workout.createdBy.name}
            </Link>
            <div className="font-bold">*</div>
            <div>{`${workout.exercises?.length} exercises` || "empty workout"}</div>
            <div className="font-bold">*</div>
            <div className="flex flex-wrap">
              {workout.tags.map((tag, index) => (
                <span key={index} className="flex items-center">
                  <Link href={`/tag/${tag.id}`}>{tag.name}</Link>
                  {index < workout.tags.length - 1 && <span>,&nbsp;</span>}
                </span>
              ))}
            </div>
          </div>
          {context === "list" ? (
            <Link href={`/workouts/${workout.id}`}>
              <p className="text-blue-400 cursor-pointer">{workout.description}</p>
            </Link>
          ) : (
            <p className="text-blue-400 cursor-pointer" onClick={handleEdit}>
              {workout.description || "Click to add a description"}
            </p>
          )}
        </div>
      </section>

      {/* User actions, different views for contexts */}
      {context === "list" && (
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-200" onClick={handleDotMenuClick}>
            <span className="sr-only">Open menu</span>
            &#x22EE; {/* Vertical ellipsis */}
          </button>
          {dotMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul className="py-1">
                <li>
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View Workout
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleEdit();
                      handleDotMenuClose();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit Metadata
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleDelete(workout.id);
                      handleDotMenuClose();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Delete Workout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {context === "page" && (
        <section>
          <div className="flex flex-col space-y-4 py-4 shadow-md shadow-midnightblue rounded-lg">
            {session && (
              <div className="px-4">
                <EditDeleteButtons
                  id={workout.id}
                  onEdit={handleEdit}
                  handleDelete={() => handleDelete(workout.id)}
                />
              </div>
            )}
          </div>
        </section>
      )}
      {isModalOpen && <EditWorkOutMetaModal onClose={onClose} workout={workout} />}
    </>
  );
};