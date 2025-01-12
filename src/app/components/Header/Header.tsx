"use client"
import SignInButton from "../SignInButton/SignInButton"
import { SignOutButton } from "../SignOutButton/SignOutButton"
import UserAvatar from "../UserAvatar/UserAvatar"
import { useSession } from "@/context/SessionContext"

export const HeaderJara = () => {
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
        <SignInButton />
    </div>
  );
}