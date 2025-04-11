"use client";

import { WorkoutWithRelations } from "../../../../types/workout";
import { useState } from "react";
import { useMessageContext } from "@/context/MessageContext";
import { useSessionContext } from "@/context/SessionContext";
// import { useRouter } from "next/navigation";



interface EditWorkOutMetaModalProps {
    workout: WorkoutWithRelations;
    onClose: () => void;
}

export const EditWorkOutMetaModal = ({ workout, onClose }: EditWorkOutMetaModalProps) => {
    const { addMessage, setApiLoading, clearMessages } = useMessageContext();
    const { session } = useSessionContext();

    const [title, setTitle] = useState(workout.title || "");
    const [description, setDescription] = useState(workout.description || "");
    const [tags, setTags] = useState(workout.tags.map(tag => tag.name).join(", "));

    const handleSave = async () => {
        clearMessages();

        if (!session?.user) {
            addMessage({ type: "error", text: "You must be logged in to edit this workout." });
            return;
        }

        try {
            setApiLoading(true);
            const res = await fetch(`/api/workouts/${workout.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    tags: tags.split(",").map(tag => tag.trim()),
                }),
            });

            if (!res.ok) {
                addMessage({ type: "error", text: "Failed to update workout metadata." });
                return;
            }

            addMessage({ type: "success", text: "Workout metadata updated successfully." });
            onClose();
        } catch (err) {
            console.error(err);
            addMessage({ type: "error", text: "An error occurred while updating the workout." });
        } finally {
            setApiLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-primary-color text-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Workout</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium">
                            Tags (comma-separated)
                        </label>
                        <input
                            id="tags"
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
                </div>
                <div className="mt-6 flex space-x-4">
                    <button
                        onClick={onClose}
                        className="py-2 px-4 bg-transparent text-white font-semibold border border-white rounded-lg shadow-md hover:bg-white hover:text-primary-color"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="py-2 px-4 bg-white text-primary-color font-semibold rounded-lg shadow-md hover:bg-gray-200"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};