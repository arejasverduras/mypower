"use client";

import { useSession } from "@/context/SessionContext";

export default function SignInButton() {
  const { signIn } = useSession();

  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Sign In with Google
    </button>
  );
}
