// import { useState } from "react";
import SignIn from "../SignInButton/SignInButton"
import { SignOutButton } from "../SignOutButton/SignOutButton"
import UserAvatar from "../UserAvatar/UserAvatar"
import { auth } from "../../../../auth"

export const HeaderJara = async () => {
    // const [headerColor, setHeaderColor ]= useState('bg-black');
    const session = await auth();
    
    if (!session?.user)
    return (
        <>
            <SignIn/>            
        </>
    )

    return (
        <div className="border flex w-full p-5 max-h-24 justify-between items-center">
            <UserAvatar/>
            <SignOutButton/>
        </div>
    )
}