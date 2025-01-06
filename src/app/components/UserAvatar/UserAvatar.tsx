import { auth } from "../../../../auth";

export default async function UserAvatar() {
    const session = await auth()
   
    if (!session?.user) return null
   
    return (
      <div className="flex items-center">
        
        <img src={session.user.image} alt="User Avatar" className="rounded-full" />
        <p className="mx-5">{session.user.name}</p>
      </div>
    )
  }