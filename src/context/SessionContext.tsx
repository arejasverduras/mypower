"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { signIn as authSignIn, signOut as authSignOut } from "next-auth/react";

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
  signIn: (provider: string, options?: any) => void; // Add signIn for logging in
  logout: () => void; // Add logout for logging out
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

  const signIn = (provider: string, options?: any) => {
    authSignIn(provider, options);
  };

  const logout = async () => {
    await authSignOut({ redirect: false }); // Prevent unnecessary page reloads
    setSession(null); // Clear session locally
  };

  return (
    <SessionContext.Provider value={{ session, loading, signIn, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};
