"use client"
import { SignOutButton } from "../components/SignOutButton/SignOutButton2"
import UserAvatar from "../components/UserAvatar/UserAvatar"
import { auth } from "../../../auth"
import { useSession } from "@/context/SessionContext"
import SignIn from "../components/SignInButton/SignInButton"

export default function DashboardPage() {
    const {session, loading} = useSession();
    
    if (loading) return (
        <div>Loading session..</div>
    )

    if (!session) return (   
        <>
            <div>Not authenticated. Please sign in</div>
            <SignIn/>
        </>
    )


    return (
        <>
            <h1>Dashboard</h1>
            <p>Hello logged in user!</p>
            <UserAvatar/>
            
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <SignOutButton/>

        </>
        
    )
}