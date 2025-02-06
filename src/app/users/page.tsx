"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/context/SessionContext";
import SignInButton from "../components/SignInButton/SignInButton";
import Link from "next/link";
import Image from "next/image";
import { User } from "@prisma/client";

// interface User {
//   id: string;
//   name: string | undefined;
//   image: string | undefined;
//   email?: string;
// }

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const { session, loading: sessionLoading } = useSession();

  useEffect(() => {
    if (session) {
      const fetchUsers = async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/users");
          if (!res.ok) {
            setError("Failed to fetch users");
          }
          const data = await res.json();
          setUsers(data.users);
        } catch (error) {
          console.error("Failed to fetch users", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [session]);

  // Fallback content if not authenticated
  const signInPrompt = (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
      <p className="mb-4">You must be logged in to view this page.</p>
      {/* <button
        onClick={() => {
          window.location.href = "/auth/signin";
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign In
      </button> */}
      <SignInButton/>
    </div>
  );

  // List of users
  const userList =
    users.length > 0 ? (
      users.map((user) => (
        <div key={user.id} className="p-4 border-b">
          <Image src={user.image || "/default-avatar.png"} alt={user.name || "Anonymous"} width={32} height={32} className="rounded-full inline-block"/>  
          <Link href={`/users/${user.id}`}><span className="ml-2">{user.name || "Anonymous"}</span></Link>
          {session?.isSuperuser && <div>{user.email}</div>}
          <button className="ml-4 bg-green-500 text-white px-3 py-1 rounded">
            Follow
          </button>
        </div>
      ))
    ) : (
      <p>No users found.</p>
    );

  return (
    <div>
      {!session && !sessionLoading ? (
        signInPrompt
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">Users</h1>

          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users"
              className="border rounded p-2"
            />
            <button
              onClick={() => {}}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Search
            </button>
          </div>

          {loading ? <p>Loading...</p> : userList}
          {error && <p className="text-red-500">{error}</p>}
        </>
      )}
    </div>
  );
}


     // const handleSearch = async () => {
    //     setLoading(true);
    //     try {
    //       const res = await fetch(`/api/users?search=${searchTerm}`);
    //       const data = await res.json();
    //       setUsers(data.users);
    //     } catch (err) {
    //       console.error("Search failed", err);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };