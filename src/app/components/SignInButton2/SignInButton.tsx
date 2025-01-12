"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <button
      onClick={handleSignIn}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Sign In with Google
    </button>
  );
}
