"use client";
// import { signIn } from "next-auth/react";
import { useSessionContext } from "@/context/SessionContext";

export default function SignInButton() {
  const { signIn } = useSessionContext();

  return (
    <button
    // onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
    onClick={() => signIn("google" )}

      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 max-w-200px max-w-44"
    >
      Sign In with Google
    </button>
  );
}
