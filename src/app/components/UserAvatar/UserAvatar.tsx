"use client"
import { auth } from "../../../../auth";
import { useSession } from "@/context/SessionContext";
import Link from "next/link";

export default function UserAvatar() {
    const {session, loading} = useSession();
   
    if (!session) return null

    // console.log("user avatar: " + Object.keys(session));
   
    return (
      <div className="flex items-center">
        {session.image && (        
          <img src={session.image} alt="User Avatar" className="rounded-full" />
)}
        <p className="mx-5">
          <Link href={`/users/${session.id}`}>{session.name}</Link>
          {session.isSuperuser && (" SUPERUSER")}
        </p>
        {/* <pre>{session.user}</pre> */}
      </div>
    )
  }