"use client"; // ✅ Ensure this is a Client Component

import { createContext, useContext, useEffect, useState } from "react";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";

interface SessionContextType {
  session: Session | null;
  sessionLoading: boolean;
  signIn: () => void;
  signOut: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export default function SessionContextProvider({ children }: { children: React.ReactNode }) {

  
  return (
    <SessionProvider> {/* ✅ NextAuth's SessionProvider now wraps everything */}
      <InnerSessionProvider>{children}</InnerSessionProvider>
    </SessionProvider>
  );
}

function InnerSessionProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [sessionLoading, setSessionLoading] = useState(status === "loading");

  useEffect(() => {
    setSessionLoading(status === "loading");
  }, [status]);

  console.log(session,status);

  return (
    <SessionContext.Provider value={{ session, sessionLoading, signIn, signOut }}>
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
