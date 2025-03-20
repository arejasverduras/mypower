"use client";

// import { useSessionContext } from "@/context/SessionContext";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  // const { signIn } = useSessionContext();

  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Sign In with Google
    </button>
  );
}
