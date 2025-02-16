import { useState, useEffect } from "react";
import WorkOutWithRelations from "../../../../types/workout";

interface CreateWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (workout: WorkOutWithRelations ) => void;
}

export const CreateWorkoutModal = ({ isOpen, onClose, onAdd }: CreateWorkoutModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [exercises, setExercises] = useState([{ id: "", customDescription: "", customSets: 0, customRepetitions: "" }]);
  const [tags, setTags] = useState("");
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch("/api/exercises", { method: "GET" });
        if (!res.ok) {
          console.error("Failed to load exercises");
          return;
        }
        const data = await res.json();
        setAvailableExercises(data);
      } catch (err) {
        console.error(err);
        console.error("Failed to load exercises");
      }
    };
    fetchExercises();
  }, []);   

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = field === 'customSets' ? parseInt(value, 10) : value;
    setExercises(newExercises);
  };

  const addExercise = () => {
    setExercises([...exercises, { id: "", customDescription: "", customSets: 0, customRepetitions: "" }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert("Title is required!");
      return;
    }

    // Pass the new workout data to the parent
    onAdd({
      title,
      description: description || undefined,
      isPublic: true,
      exercises,
      tags: tags.split(',').map(tag => tag.trim()),
    });

    // Clear inputs
    setTitle("");
    setDescription("");
    setExercises([{ id: "", customDescription: "", customSets: 0, customRepetitions: "" }]);
    setTags("");

    // Close the modal
    onClose();
  };

  if (!isOpen) return null; // Render nothing if modal is closed

  return  (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-primary-color text-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Create Workout</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium">Exercises</h3>
            {exercises.map((exercise, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm font-medium">Exercise</label>
                <select
                  value={exercise.id}
                  onChange={(e) => handleExerciseChange(index, 'id', e.target.value)}
                  required
                  className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="">Select an exercise</option>
                  {availableExercises.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.title}
                    </option>
                  ))}
                </select>
                <label className="block text-sm font-medium">Custom Description</label>
                <input
                  type="text"
                  value={exercise.customDescription}
                  onChange={(e) => handleExerciseChange(index, 'customDescription', e.target.value)}
                  className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
                <label className="block text-sm font-medium">Custom Sets</label>
                <input
                  type="number"
                  value={exercise.customSets}
                  onChange={(e) => handleExerciseChange(index, 'customSets', e.target.value)}
                  className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
                <label className="block text-sm font-medium">Custom Repetitions</label>
                <input
                  type="text"
                  value={exercise.customRepetitions}
                  onChange={(e) => handleExerciseChange(index, 'customRepetitions', e.target.value)}
                  className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            ))}
            <button type="button" onClick={addExercise} className="mt-2 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600">
              Add Exercise
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="py-2 px-4 bg-white text-primary-color font-semibold rounded-lg shadow-md hover:bg-gray-200"
            >
              Create
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