import { useState, useEffect } from "react";
import { YouTube } from "../../Video/YouTube/YouTube";
import { ExerciseWithRelations } from "../../../../types/exercise";

interface EditExerciseModalProps {
  exerciseId: string;
  onClose: () => void;
  onSave: (updatedExercise: ExerciseWithRelations) => void;
}

export default function EditExerciseModal({
  exerciseId,
  onClose,
  onSave,
}: EditExerciseModalProps) {
  const [formData, setFormData] = useState<Partial<ExerciseWithRelations>>({});
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExerciseDetails = async () => {
      try {
        const res = await fetch(`/api/exercises/${exerciseId}`);
        if (!res.ok) setError("Failed to fetch exercise details");
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchExerciseDetails();
  }, [exerciseId]);

  // Extract YouTube video ID
  const getYouTubeId = (url: string = "") => {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const handleFormChange = (field: keyof ExerciseWithRelations, value: string) => {
    setFormData((prev) => ({ 
      ...prev, 
      [field]: field ==="video" ?  getYouTubeId(value): value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/exercises/${exerciseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update exercise");

      const updatedExercise = await res.json();
      onSave(updatedExercise);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  // const videoId = getYouTubeId(formData.video);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-primary-color text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Exercise</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={formData.title || ""}
              onChange={(e) => handleFormChange("title", e.target.value)}
              required
              className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input
              type="string"
              value={formData.image || ""}
              onChange={(e) => handleFormChange("image", e.target.value)}
              className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">YouTube Video URL</label>
            <input
              type="string"
              value={formData.video || ""}
              onChange={(e) => handleFormChange("video", e.target.value)}
              className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            {formData.video && (
              <div className="mt-2">
                <YouTube embedId={formData.video} />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={formData.description || ""}
              onChange={(e) => handleFormChange("description", e.target.value)}
              rows={3}
              className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium">Execution</label>
            <textarea
              value={formData.execution || ""}
              onChange={(e) => handleFormChange("execution", e.target.value)}
              rows={3}
              className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            ></textarea>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="py-2 px-4 bg-white text-primary-color font-semibold rounded-lg shadow-md hover:bg-gray-200"
            >
              Save
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
}
