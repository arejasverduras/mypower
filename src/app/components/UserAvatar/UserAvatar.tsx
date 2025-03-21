
"use client"
import { useSessionContext } from "@/context/SessionContext";
import Link from "next/link";
import Image from "next/image";

export default function UserAvatar() {
    const {session} = useSessionContext();
   
    if (!session) return null
   
    return (
      <div className="flex items-center">
        {session.user?.image && (        
          <Image src={session.user.image} alt="User Avatar" className="rounded-full" width={50} height={50} />
)}
        <p className="mx-5">
          <Link href={`/users/${session.user?.id}`}>{session.user?.name}</Link>
          {session.user?.isSuperuser && (" SUPERUSER")}
        </p>
      </div>
    )
  }