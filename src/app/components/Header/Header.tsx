"use client"
// import { useState } from "react";
// import SignIn from "../SignInButton/SignInButton"
import SignIn from "../SignInButton2/SignInButton"
// import { SignOutButton } from "../SignOutButton/SignOutButton"
import { SignOutButton } from "../SignOutButton2/SignOutButton2"
import UserAvatar from "../UserAvatar/UserAvatar"
// import { auth } from "../../../../auth"
import { useSession } from "@/context/SessionContext"

export const HeaderJara = () => {
    // const [headerColor, setHeaderColor ]= useState('bg-black');
    // const session = await auth();
    const { session, loading } = useSession();

    if (loading) {
        return <div>Loading...</div>;
      }

    if (session) {
        return (
            <div className="border flex w-full p-5 max-h-24 justify-between items-center">
              <>
                <UserAvatar />
                <SignOutButton />
              </> 
          </div>
        )
    }

  return (
    <div className="border flex w-full p-5 max-h-24 justify-between items-center">
        <SignIn />
    </div>
  );
}