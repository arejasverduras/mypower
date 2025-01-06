
import { SignOutButton} from "../components/SignOutButton/SignOutButton"
import UserAvatar from "../components/UserAvatar/UserAvatar"

export default function DashboardPage() {

    return (
        <>

            <h1>Dashboard</h1>
            <p>Hello logged in user!</p>
            <UserAvatar/>
            <SignOutButton/>
        </>
        
    )
}