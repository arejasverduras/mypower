"use client"; // ✅ Required for React Context

import { createContext, useContext, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";

interface SessionContextType {
  session: Session | null;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export default function SessionContextProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(status === "loading");

  useEffect(() => {
    setLoading(status === "loading");
  }, [status]);

  return (
    <SessionContext.Provider value={{ session, loading, signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionContext must be used within a SessionContextProvider");
  }
  return context;
}
