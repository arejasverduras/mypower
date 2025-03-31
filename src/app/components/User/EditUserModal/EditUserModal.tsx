import { useState, useEffect } from "react";
import type { User } from "@prisma/client";
import { ExerciseWithRelations } from "../../../../types/exercise";
import{ useMessageContext }from "@/context/MessageContext";
import { LoadingSpinner } from "../../UI functions/LoadingSpinner/LoadingSpinner";


interface EditUserModalProps {
    userId: string;
    onClose: () => void;
    onSave: (updatedUser: User & {createdExercises: ExerciseWithRelations[]}) => void;
  }

  export const EditUserModal = ({userId, onClose, onSave}: EditUserModalProps) => {
    const [formData, setFormData] = useState<Partial<User>>({});
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
    const [validationLoading, setValidationLoading] = useState(false);
    const { addMessage, apiLoading, setApiLoading, clearMessages } = useMessageContext();


    useEffect(() => {
        const fetchUserDetails = async () => {
          clearMessages();
          setApiLoading(true); // Start loading state

          try {
            const res = await fetch(`/api/users/${userId}`);
            if (!res.ok) {
              addMessage({type: "error", text: "Failed to fetch user details."});
              return;
            }
            const data = await res.json();
            setFormData(data);
          } catch (err) {
            console.error(err);
            addMessage({type: "error", text: "An error occurred while fetching user details."});
          } finally { 
            setApiLoading(false); 
          }
        };
    
        fetchUserDetails();
      }, [userId]);
    
    const handleFormChange = (field: keyof User, value: string) => {
        setFormData((prev) => ({ 
          ...prev, 
          [field]: value }));

        // Trigger real-time validation for username changes
        if (field === "name") {
            validateUsername(value);
        }

    };

    const validateUsername = (name: string) => {
        if (!name || name === formData.name) {
          setUsernameAvailable(null);
          return;
        }
    
        setValidationLoading(true);
        const timeout = setTimeout(async () => {
          try {
            const res = await fetch(`/api/users/${userId}/check-username?name=${encodeURIComponent(name)}`);
            if (!res.ok) throw new Error("Failed to validate username");
            const data = await res.json();
            setUsernameAvailable(!data.exists);
          } catch (err) {
            console.error(err);
            setUsernameAvailable(false);
          } finally {
            setValidationLoading(false);
          }
        }, 1000);
    
        return () => clearTimeout(timeout); // Debounce for API calls
      };
        

    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (usernameAvailable === false) {
            alert("Username is already taken. Please choose another.");
            return;
          }
      

        try {
          clearMessages();
          setApiLoading(true); 
          
          const res = await fetch(`/api/users/${userId}/edit`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
    
          if (!res.ok) {
            addMessage({type: "error", text: "Failed to update user."});
            return;
          }
    
          const updatedUser = await res.json();
          onSave(updatedUser);
          onClose();
          addMessage({type: "success", text: "User updated successfully."});
        } catch (err) {
          console.error(err);
          addMessage({type: "error", text: "An error occurred while updating user."});
        } finally {
          setApiLoading(false);
        }
      };

      if (apiLoading) {
        return (
          <LoadingSpinner />
        )
      }

      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-primary-color text-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => handleFormChange("name", e.target.value)}
                required
                className={`w-full mt-1 p-2 bg-transparent border rounded-lg focus:outline-none focus:ring-2 ${
                    usernameAvailable === false ? "border-red-500" : "border-white"
                }`}
                />
                {validationLoading && <p className="text-sm text-gray-300">Validating username...</p>}
                {usernameAvailable === false && <p className="text-sm text-red-500">Username is taken.</p>}
                {usernameAvailable === true && <p className="text-sm text-green-500">Username is available!</p>}
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
              {/* <div>
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
              </div> */}
              <div>
                <label className="block text-sm font-medium">About me</label>
                <textarea
                  value={formData.bio || ""}
                  onChange={(e) => handleFormChange("bio", e.target.value)}
                  rows={3}
                  className="w-full mt-1 p-2 bg-transparent border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium">favorite quote</label>
                <textarea
                  value={formData.quote || ""}
                  onChange={(e) => handleFormChange("quote", e.target.value)}
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
    };
