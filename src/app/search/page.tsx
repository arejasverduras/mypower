"use client";
import { useState, useEffect } from "react";
import { SearchBar } from "../components/UI functions/SearchBar/SearchBar";
import { ExerciseList } from "../components/Exercises/ExerciseList/ExerciseList";
import { WorkOutList } from "../components/WorkOuts/WorkOutList/WorkOutList";
import Link from "next/link";
import { ExerciseWithRelations } from "../../types/exercise";
import { WorkoutWithRelations } from "../../types/workout";
import { User as UserType } from "@prisma/client";
import { useMessageContext } from "@/context/MessageContext";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [exercises, setExercises] = useState<ExerciseWithRelations[]>([]);
  const [workouts, setWorkouts] = useState<WorkoutWithRelations[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);

  const { addMessage, apiLoading, setApiLoading, clearMessages } = useMessageContext();



  useEffect(() => {
    if (searchTerm.trim() === "") {
      setExercises([]);
      setWorkouts([]);
      setUsers([]);
      clearMessages(); 
      return;
    }
  
    const fetchData = async () => {
      clearMessages(); 
      setApiLoading(true);

      try {
        const [workoutsRes, exercisesRes, usersRes] = await Promise.allSettled([
          fetch(`/api/workouts?search=${searchTerm}`),
          fetch(`/api/exercises?search=${searchTerm}`),
          fetch(`/api/users?search=${searchTerm}`),
        ]);
  
        // ✅ Handle Workouts Response
        if (workoutsRes.status === "fulfilled") {
          if (workoutsRes.value.ok) {
            const workoutsData: WorkoutWithRelations[] = await workoutsRes.value.json();
            setWorkouts(workoutsData);
          } else {
            console.error("Error fetching workouts:", await workoutsRes.value.text());

            addMessage({
              type: "error",
              text  : "Error fetching workouts"})
          }
        } else {
          console.error("Request failed (workouts):", workoutsRes.reason);
          addMessage({
            type: "error",
            text  : "Network error fetching workouts"})
        }
  
        // ✅ Handle Exercises Response
        if (exercisesRes.status === "fulfilled") {
          if (exercisesRes.value.ok) {
            const exercisesData: ExerciseWithRelations[] = await exercisesRes.value.json();
            setExercises(exercisesData);
          } else {
            console.error("Error fetching exercises:", await exercisesRes.value.text());
            addMessage({
              type: "error",
              text  : "Error fetching exercises"})
            
          }
        } else {
          console.error("Request failed (exercises):", exercisesRes.reason);
          addMessage({
            type: "error",
            text  : "Network error fetching exercises"})
        }
  
        // ✅ Handle Users Response
        if (usersRes.status === "fulfilled") {
          if (usersRes.value.ok) {
            const { users: usersData }: { users: UserType[] } = await usersRes.value.json();
            // const usersData: UserType[] = await usersRes.value.json();
            setUsers(usersData);
          } else {
            console.error("Error fetching users:", await usersRes.value.text());
    
            addMessage({
              type: "error",
              text  : "Error fetching users"})
          }
        } else {
          console.error("Request failed (users):", usersRes.reason);

          addMessage({
            type: "error",
            text  : "Network error fetching users"})
        }
      } catch (error) {
        console.error("Unexpected Error fetching search results:", error);
        addMessage({
          type: "error",
          text  : "Unexpected error fetching search results"})
      } finally {
        setApiLoading(false);
      }
    };
  
    fetchData();
  }, [searchTerm]);
  

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-heading text-headertext font-bold mb-6 text-center sm:text-left">Search</h1>
        <SearchBar search={searchTerm} setSearch={setSearchTerm} placeholderText="Search programs, workouts, exercises, tags, users ..." />
      </div>
      <div className="max-w-4xl mx-auto">
        {apiLoading ? (
          // Loading Spinner
          <div className="flex justify-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4.293 6.293a1 1 0 011.414 0L12 12.586l6.293-6.293a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z"
              />
            </svg>
          </div>
          // export to component
        ) 
        :
      <div className="searchResults">
        {exercises.length === 0 && workouts.length === 0 && users.length === 0 ? (
          <p className="text-gray-500 text-center">No results found</p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {workouts.length > 0 && (
              <>
                <h2 className="text-2xl font-heading text-headertext font-bold mb-4">Workouts</h2>
                <WorkOutList workouts={workouts} />
              </>
            )}
            {exercises.length > 0 && (
              <>
                <h2 className="text-2xl font-heading text-headertext font-bold mb-4">Exercises</h2>
                <ExerciseList exercises={exercises} />
              </>
            )}
            {users.length > 0 && (
              <>
                <h2 className="text-2xl font-heading text-headertext font-bold mb-4">Users</h2>
                <div>
                  {users.map((user) => (
                    <Link href={`/users/${user.id}`} passHref key={user.id}>
                      <div className="bg-white shadow-card p-5 rounded-xl border border-gray-200">
                        <h3 className="text-xl font-semibold text-text">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>}
      </div>
    </div>
  );
}
