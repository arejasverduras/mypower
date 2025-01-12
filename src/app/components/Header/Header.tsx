"use client"
import SignIn from "../SignInButton2/SignInButton"
import { SignOutButton } from "../SignOutButton2/SignOutButton2"
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
        <SignIn />
    </div>
  );
}