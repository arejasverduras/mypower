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
    <form onSubmit={handleSubmit}>
      <h2>Add Exercise</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        type="text"
        placeholder="Video URL (optional)"
        value={video}
        onChange={(e) => setVideo(e.target.value)}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      ></textarea>
       <textarea
        placeholder="Execution (optional)"
        value={execution}
        onChange={(e) => setExecution(e.target.value)}
        rows={3}
      ></textarea>
      <button type="submit">Add Exercise</button>
    </form>
  );
}
