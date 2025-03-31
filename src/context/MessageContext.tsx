"use client"
import { createContext, useContext, useState, ReactNode } from "react";

interface Message {
  type: "success" | "error";
  text: string;
}

interface MessageContextType {
  messages: Message[];
  apiLoading: boolean;
  setApiLoading: (loading: boolean) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [apiLoading, setApiLoading] = useState<boolean>(false);

  const addMessage = (message: Message, timeout = 5000) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  
    if (message.type === "success") {
      setTimeout(() => {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg !== message)
        );
      }, timeout);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    // apiLoading, setApiLoading ??
    <MessageContext.Provider value={{ messages, apiLoading, setApiLoading, addMessage, clearMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
};