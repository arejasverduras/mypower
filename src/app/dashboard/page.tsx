"use client"

import { useSessionContext } from "@/context/SessionContext"
// components
import UserAvatar from "../components/UserAvatar/UserAvatar"
import SignInButton from "../components/SignInButton/SignInButton"
import { SignOutButton } from "../components/SignOutButton/SignOutButton"

export default function DashboardPage() {
    const {session, sessionLoading} = useSessionContext();
    
    if (sessionLoading) return (
        <div>Loading session..</div>
    )

    if (!session) return (   
        <>
            <div>Not authenticated. Please sign in</div>
            <SignInButton/>
        </>
    )

    return (
        <>
            <h1>Dashboard</h1>
            <p>Hello logged in user!</p>
            <UserAvatar/>

            <SignOutButton/>
        </>
    )
};
