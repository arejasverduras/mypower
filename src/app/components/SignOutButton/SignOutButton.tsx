"use client";

import { useSessionContext } from "@/context/SessionContext";

export function SignOutButton() {
  const { signOut } = useSessionContext();


  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Sign Out
    </button>
  );
}
