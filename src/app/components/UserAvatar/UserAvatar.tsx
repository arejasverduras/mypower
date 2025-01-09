import { auth } from "../../../../auth";
import Link from "next/link";

export default async function UserAvatar() {
    const session = await auth()
   
    if (!session?.user) return null

    console.log(session.user);
   
    return (
      <div className="flex items-center">
        {session.user.image && (        
          <img src={session.user.image} alt="User Avatar" className="rounded-full" />
)}
        <p className="mx-5">
          <Link href={`/users/${session.user.id}`}>{session.user.name}</Link></p>
        {/* <pre>{session.user}</pre> */}
      </div>
    )
  }