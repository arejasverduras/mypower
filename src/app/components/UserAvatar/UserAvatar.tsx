
"use client"
import { useSession } from "@/context/SessionContext";
import Link from "next/link";
import Image from "next/image";

export default function UserAvatar() {
    const {session} = useSession();
   
    if (!session) return null
   
    return (
      <div className="flex items-center">
        {session.image && (        
          <Image src={session.image} alt="User Avatar" className="rounded-full" />
)}
        <p className="mx-5">
          <Link href={`/users/${session.id}`}>{session.name}</Link>
          {session.isSuperuser && (" SUPERUSER")}
        </p>
      </div>
    )
  }