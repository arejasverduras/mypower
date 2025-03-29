"use client"; // ✅ Ensure this is a Client Component

import { createContext, useContext, useEffect, useState } from "react";
import { SessionProvider, useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";
import type { Session } from "next-auth";
import { useMessageContext } from "./MessageContext";

interface SessionContextType {
  session: Session | null;
  sessionLoading: boolean;
  signIn: (provider?: string, options?: Record<string, unknown>) => void;
  signOut: (options?: Record<string, unknown>) => void;
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
  const { addMessage, setApiLoading } = useMessageContext();

  useEffect(() => {
    setSessionLoading(status === "loading");
  }, [status]);

  console.log(session,status);

  const signIn = async (provider?: string, options?: Record<string, unknown>) => {
    setApiLoading(true);
    try {
      await nextAuthSignIn(provider, options); // Pass the parameters to nextAuthSignIn
      addMessage({ type: "success", text: "Signed in successfully!" }); // Success message
    } catch (error) {
      console.error("Sign-in error:", error);
      addMessage({ type: "error", text: "Failed to sign in. Please try again." }); // Error message
    } finally {
      setApiLoading(false);
    }
  };

  const signOut = async (options?: Record<string, unknown>) => {
    setApiLoading(true);
    try {
      await nextAuthSignOut(options); // Pass the options to nextAuthSignOut
      addMessage({ type: "success", text: "Signed out successfully!" }); // Success message
    } catch (error) {
      console.error("Sign-out error:", error);
      addMessage({ type: "error", text: "Failed to sign out. Please try again." }); // Error message
    } finally {
      setApiLoading(false);
    }
  };


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
