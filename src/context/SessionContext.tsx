"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { signOut } from "next-auth/react";

interface Session {
  id: string;
  name: string;
  email: string;
  image: string;
  isSuperuser: boolean;
  user: object;
}

interface SessionContextValue {
  session: Session | null;
  loading: boolean;
  setSession: (session: Session | null) => void; // Add setSession for updates

}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/session");
        const data = await res.json();
        if (data.authenticated) {
          setSession(data.user);
        } else {
          setSession(null);
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  const { setSession } = context;

  const logout = async () => {
    await signOut({ redirect: false }); // Prevent unnecessary page reloads
    setSession(null); // Clear session locally
  };


  return { ...context, logout };
}
