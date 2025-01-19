import { useState, useEffect } from "react";
import type { User } from "@prisma/client";
import { ExerciseProps } from "@/app/api/exercises/route";


interface EditUserModalProps {
    userId: string;
    onClose: () => void;
    onSave: (updatedUser: User & {createdExercises: ExerciseProps[]}) => void;
  }

  export const EditUserModal = ({userId, onClose, onSave}: EditUserModalProps) => {
    const [formData, setFormData] = useState<Partial<User>>();
    const [loading, setLoading] = useState(true); // To handle loading state


    useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const res = await fetch(`/api/users/${userId}`);
            if (!res.ok) throw new Error("Failed to fetch user details");
            const data = await res.json();
            setFormData(data);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false); // Stop loading once data is fetched
          }
        };
    
        fetchUserDetails();
      }, [userId]);
    
      const handleFormChange = (field: keyof User, value: string) => {
        setFormData((prev) => ({ 
          ...prev, 
          [field]: value }));
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          const res = await fetch(`/api/users/${userId}/edit`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
    
          if (!res.ok) throw new Error("Failed to update user");
    
          const updatedUser = await res.json();
          onSave(updatedUser);
          onClose();
        } catch (err) {
          console.error(err);
        }
      };

    return (
        <>
            
            <div>Edit User modal</div>
            <button onClick={onClose}>Close</button>
        </>
    )
  };
