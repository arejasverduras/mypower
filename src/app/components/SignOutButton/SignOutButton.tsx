"use client";

import { useSession } from "@/context/SessionContext";

export function SignOutButton() {
  const { logout } = useSession();

  return (
    <button
      type="button"
      onClick={logout}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Sign Out
    </button>
  );
}
