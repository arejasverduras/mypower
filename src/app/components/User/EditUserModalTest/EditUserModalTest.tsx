"use client"
import { useState } from "react";

export default function EditUserModalTest ({userId}: {userId: string}){
    const [response, setResponse] = useState<string | undefined>();
    const [testName, setTestName] = useState<string>("")


    const testBody = {
        name: testName || "ultra user",
        // image: "/images/JaraFitM.png"
    }

    // userId = "4"

    const routeTest = async () => {
        setResponse ("sent")
        try {
            const res = await fetch(`/api/users/${userId}/edit`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(testBody),
            });
      
            if (!res.ok) {
                console.warn(`Failed with status: ${res.status} ${res.statusText}`);
                setResponse(`Error: ${res.statusText}`);
                return;
              }
      
            const updatedUser = await res.json();
            // onSave(updatedExercise);
            // onClose();
            setResponse(`Success! Updated name: ${updatedUser.name}`);

          } catch (err: any) {
            console.error("Request failed:", err.message);
      setResponse("An error occurred. Please try again.");
          } 
        };


    return (
        <div>
            <button onClick={routeTest} className="bg-blue-500 text-white px-4 py-2 rounded">
                TEST NAME EDIT
            </button>
            <input 
                type="text" 
                value={testName} 
                onChange={(e)=> setTestName(e.target.value)}
                className="text-black "/>
            <div className="mt-4 ">{response}</div>
    </div>
    )
};
