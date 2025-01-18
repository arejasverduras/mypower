import { useState, useEffect } from "react";
import type { User } from "@prisma/client";


interface EditUserModalProps {
    userId: string;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
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
    
    //   const handleFormChange = (field: keyof Exercise, value: string) => {
    //     setFormData((prev) => ({ 
    //       ...prev, 
    //       [field]: field ==="video" ?  getYouTubeId(value): value }));
    //   };
    
    //   const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    
    //     try {
    //       const res = await fetch(`/api/exercises/${exerciseId}`, {
    //         method: "PATCH",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(formData),
    //       });
    
    //       if (!res.ok) throw new Error("Failed to update exercise");
    
    //       const updatedExercise = await res.json();
    //       onSave(updatedExercise);
    //       onClose();
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };

    return (
        <>

        </>
    )
  };
