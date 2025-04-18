"use client"
import SignInButton from "../SignInButton/SignInButton"
import { SignOutButton } from "../SignOutButton/SignOutButton"
import UserAvatar from "../UserAvatar/UserAvatar"
import { useSessionContext } from "@/context/SessionContext"

export const HeaderJara = () => {
    const { session, sessionLoading,  } = useSessionContext();

    if (sessionLoading) {
        return <div>Loading session...</div>;
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
        <SignInButton />
    </div>
  );
}