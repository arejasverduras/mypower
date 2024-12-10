import { useState } from "react";

interface AddExerciseFormProps {
    onAdd: (exercise: {
        title: string,
        image?: string,
        video?: string,
        description?: string,
        execution?: string,
    }) => void;
}

export const AddExerciseForm = ({onAdd}: AddExerciseFormProps) => {
    const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [execution, setExecution] = useState("");

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
      video: video || undefined,
      description: description || undefined,
      execution: execution || undefined,
    });

    // Clear inputs
    setTitle("");
    setImage("");
    setVideo("");
    setDescription("");
    setExecution("");
  };

  return (
    <form 
        onSubmit={handleSubmit}
        className="bg-white text-gray-900 p-6 rounded-lg shadow-md w-full max-w-md mx-auto space-y-4"
>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add Exercise</h2>
      <label className="block text-sm font-medium text-gray-700">Title *</label>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label className="block text-sm font-medium text-gray-700">Image (URL)</label> 
      <input
        type="url"
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
<label className="block text-sm font-medium text-gray-700">YouTube Video URL (last part)</label> 
      <input
        type="text"
        placeholder="Video URL (optional)"
        value={video}
        onChange={(e) => setVideo(e.target.value)}
      />
    <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      ></textarea>
        <label className="block text-sm font-medium text-gray-700">Execution (Optional)</label>

       <textarea
        placeholder="Execution (optional)"
        value={execution}
        onChange={(e) => setExecution(e.target.value)}
        rows={3}
      ></textarea>
      <button 
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"

        >Add Exercise</button>
    </form>
  );
}
