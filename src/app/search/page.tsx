"use client";
import { useState, useEffect } from "react";
import { SearchBar } from "../components/UI functions/SearchBar/SearchBar";
import { ExerciseList } from "../components/Exercises/ExerciseList/ExerciseList";
import { WorkOutList } from "../components/WorkOuts/WorkOutList/WorkOutList";
import Link from "next/link";
import { ExerciseWithRelations } from "../../types/exercise";
import { WorkoutWithRelations } from "../../types/workout";
import { User as UserType } from "@prisma/client";
import { Errors, ErrorsType } from "../components/UI functions/Errors/Errors";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [exercises, setExercises] = useState<ExerciseWithRelations[]>([]);
  const [workouts, setWorkouts] = useState<WorkoutWithRelations[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [errors, setErrors] = useState<ErrorsType>([]);




  useEffect(() => {
    if (searchTerm.trim() === "") {
      setExercises([]);
      setWorkouts([]);
      setUsers([]);
      setErrors([]); // ✅ Ensure errors are cleared when no search
      return;
    }
  
    const fetchData = async () => {
      setErrors([]); // ✅ Reset errors at start
  
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
            setErrors((prev) => [...prev, "Error fetching Workouts"]);
          }
        } else {
          console.error("Request failed (workouts):", workoutsRes.reason);
          setErrors((prev) => [...prev, "Network error fetching Workouts"]);
        }
  
        // ✅ Handle Exercises Response
        if (exercisesRes.status === "fulfilled") {
          if (exercisesRes.value.ok) {
            const exercisesData: ExerciseWithRelations[] = await exercisesRes.value.json();
            setExercises(exercisesData);
          } else {
            console.error("Error fetching exercises:", await exercisesRes.value.text());
            setErrors((prev) => [...prev, "Error fetching Exercises"]);
          }
        } else {
          console.error("Request failed (exercises):", exercisesRes.reason);
          setErrors((prev) => [...prev, "Network error fetching Exercises"]);
        }
  
        // ✅ Handle Users Response
        if (usersRes.status === "fulfilled") {
          if (usersRes.value.ok) {
            const usersData: UserType[] = await usersRes.value.json();
            setUsers(usersData);
          } else {
            console.error("Error fetching users:", await usersRes.value.text());
            setErrors((prev) => [...prev, "Error fetching Users"]);
          }
        } else {
          console.error("Request failed (users):", usersRes.reason);
          setErrors((prev) => [...prev, "Network error fetching Users"]);
        }
      } catch (error) {
        console.error("Unexpected Error fetching search results:", error);
        setErrors((prev) => [...prev, "Unexpected error fetching search results"]);
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
      <Errors errors={errors} />
      
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
      </div>
    </div>
  );
}
