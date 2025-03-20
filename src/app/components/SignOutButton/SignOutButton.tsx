"use client";
import { signOut } from "next-auth/react";

export function SignOutButton() {


  return (
    <button
      type="button"
      onClick={() => signOut()}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Sign Out
    </button>
  );
}
