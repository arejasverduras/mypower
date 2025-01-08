import { auth } from "../../../../auth";

export default async function UserAvatar() {
    const session = await auth()
   
    if (!session?.user) return null

    console.log(session.user);
   
    return (
      <div className="flex items-center">
        {session.user.image && (        
          <img src={session.user.image} alt="User Avatar" className="rounded-full" />
)}
        <p className="mx-5">{session.user.name}</p>
        {/* <pre>{session.user}</pre> */}
      </div>
    )
  }