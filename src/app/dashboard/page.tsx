
import { SignOutButton} from "../components/SignOutButton/SignOutButton"
import UserAvatar from "../components/UserAvatar/UserAvatar"
import { auth } from "../../../auth"

export default async function DashboardPage() {
    const session = await auth()
  if (!session) return <div>Not authenticated</div>


    return (
        <>

            <h1>Dashboard</h1>
            <p>Hello logged in user!</p>
            <UserAvatar/>
            <SignOutButton/>
            <pre>{JSON.stringify(session, null, 2)}</pre>

        </>
        
    )
}