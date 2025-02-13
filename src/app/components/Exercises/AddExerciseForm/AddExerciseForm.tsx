import { useState } from "react";
import { YouTube } from "../../Video/YouTube/YouTube";

interface AddExerciseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (exercise: {
    title: string;
    image?: string;
    video?: string;
    description?: string;
    execution?: string;
  }) => void;
}

export const AddExerciseModal = ({ isOpen, onClose, onAdd }: AddExerciseFormProps) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [execution, setExecution] = useState("");

    // Extract YouTube video ID
    const getYouTubeId = (url: string) => {
      const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(regex);
      return match ? match[1] : "";
    };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert("Title is required!");
      return;
    }

    // Pass the new exercise data to the parent
    onAdd({
      title,
      image: image || undefined,
      video: getYouTubeId(video) || undefined,
      description: description || undefined,
      execution: execution || undefined,
    });

    // Clear inputs
    setTitle("");
    setImage("");
    setVideo("");
    setDescription("");
    setExecution("");

    // Close the modal
    onClose();
  };

  if (!isOpen) return null; // Render nothing if modal is closed

  const videoId = getYouTubeId(video);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-primary-color text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Exercise</h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div>
            <label className="block text-sm font-medium">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">YouTube Video URL</label>
            <input
              type="text"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            {videoId && (
              <div className="mt-2">
              <YouTube embedId={videoId} />
            </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium">Execution</label>
            <textarea
              value={execution}
              onChange={(e) => setExecution(e.target.value)}
              rows={3}
              className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            ></textarea>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="py-2 px-4 bg-white text-primary-color font-semibold rounded-lg shadow-md hover:bg-gray-200"
            >
              Add
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-transparent text-white font-semibold border border-white rounded-lg shadow-md hover:bg-white hover:text-primary-color"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
