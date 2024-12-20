'use client'

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface BackButtonProps {
    fallback: "exercises" | "workouts"
}

export const BackButton = ({fallback}: BackButtonProps) => {
    const router = useRouter();
    const [referrer, setReferrer] = useState<string | null>(null);

    useEffect(()=>{
        if (document.referrer) {
            setReferrer(document.referrer)
        }
    },[]);

    const handleBack = () => {
        if (referrer) {
          // Navigate to the previous page
          window.location.href = referrer;
        } else {
          // Fallback to the exercises page
          router.push(fallback);
        }
      };
      
    return (
        <button
            onClick={handleBack}
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
    >
      Go Back
    </button>
    )
};

