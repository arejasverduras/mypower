"use client"
import { createContext, useContext, useState, ReactNode } from "react";

interface Message {
  type: "success" | "error";
  text: string;
}

interface MessageContextType {
  messages: Message[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    // apiLoading, setApiLoading ??
    <MessageContext.Provider value={{ messages, loading, setLoading, addMessage, clearMessages }}>
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