// import { useMessageContext } from "@/context/MessageContext";
"use client"
// import { useMessageContext } from "@/context/MessageContext";
import { useMessageStore } from "@/app/stores/apiMessageStore";

export const ApiMessage = () => {
  const { messages, apiLoading, customLoadingMessage, clearMessages } = useMessageStore();

  if (apiLoading) {
    return (
      <div className="fixed top-0 left-0 right-0 p-4 z-50">
        <div className="p-4 mb-4 rounded-lg shadow-md bg-blue-500 text-white">
          {customLoadingMessage || "Loading..."}
        </div>
      </div>
    );
  }

  if (messages.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 p-4 z-50">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-4 mb-4 rounded-lg shadow-md ${
            message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {message.text}
        </div>
      ))}
      <button
        onClick={clearMessages}
        className="mt-4 py-2 px-4 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700"
      >
        Clear Messages
      </button>
    </div>
  );
};