import { create } from "zustand";

interface Message {
  type: "success" | "error";
  text: string;
}

interface MessageState {
  messages: Message[];
  apiLoading: boolean;
  setApiLoading: (loading: boolean) => void;
  customLoadingMessage: string;
  setCustomLoadingMessage: (message: string) => void;
  addMessage: (message: Message, timeout?: number) => void;
  clearMessages: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  apiLoading: false,
  customLoadingMessage: "",
  setCustomLoadingMessage: (message) => set({ customLoadingMessage: message }),

  setApiLoading: (loading) => set({ apiLoading: loading }),

  addMessage: (message, timeout = 3000) => {
    set((state) => ({ messages: [...state.messages, message] }));

    if (message.type === "success") {
      setTimeout(() => {
        set((state) => ({
          messages: state.messages.filter((msg) => msg !== message),
        }));
      }, timeout);
    }
  },

  clearMessages: () => set({ messages: [] }),
}));