"use client"
import { useState, useEffect } from "react";
import { SearchBar } from "../components/UI functions/SearchBar/SearchBar";
import { ExerciseList } from "../components/Exercises/ExerciseList/ExerciseList";
import { WorkOutList } from "../components/WorkOuts/WorkOutList/WorkOutList";
import Link from "next/link";
import { ExerciseWithRelations } from "../../../types/exercise";
import { WorkoutWithRelations } from "../../../types/workout";
import { User as UserType } from "@prisma/client";

export default function SearchPage () {
    const [searchTerm, setSearchTerm] = useState<string>(''); 
    // const [searchType, setSearchType] = useState<string>('all');

    const [exercises, setExercises] = useState<ExerciseWithRelations[]>([]);
    const [workouts, setWorkouts] = useState<WorkoutWithRelations[]>([]);
    const [users, setUsers] = useState<UserType[]>([]);
    const [error, setError] = useState<string | null>(null);


    // this page should query the api on multiple endpoints and show results accordingly. Existing 'list' items can be reused to display the results.


    useEffect(() => {
        if (searchTerm.trim() === '') {
            setExercises([]);
            setWorkouts([]);
            setUsers([]);
            return;
          }
      

          const fetchData = async () => {
            try {
              const [workoutsRes, exercisesRes, usersRes] = await Promise.allSettled([
                fetch(`/api/workouts?search=${searchTerm}`),
                fetch(`/api/exercises?search=${searchTerm}`),
                fetch(`/api/users?search=${searchTerm}`)
              ]);
      
              if (workoutsRes.status === 'fulfilled') {
                const workoutsData:WorkoutWithRelations[] = await workoutsRes.value.json();
                setWorkouts(workoutsData.map(workout => ({ ...workout, type: 'workout' })));
              } else {
                console.error("Error fetching workouts:", workoutsRes.reason);
                setError("Error fetching workouts");
              }
      
              if (exercisesRes.status === 'fulfilled') {
                const exercisesData: ExerciseWithRelations[] = await exercisesRes.value.json();
                setExercises(exercisesData.map(exercise => ({ ...exercise, type: 'exercise' })));
              } else {
                console.error("Error fetching exercises:", exercisesRes.reason);
                setError("Error fetching exercises");
              }
      
              if (usersRes.status === 'fulfilled') {
                const usersData: {users: UserType[]} = await usersRes.value.json();
                setUsers(usersData.users.map(user => ({ ...user, type: 'user' })));
              } else {
                console.error("Error fetching users:", usersRes.reason);
                setError("Error fetching users");
              }
            } catch (error) {
              console.error("Error fetching search results:", error);
              setError("Error fetching search results");
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
          <div className="searchResults">
            {error && <p className="text-red-500 text-center">{error}</p>}
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
                      {users.map(user => (
                        <Link href={`/users/${user.id}`} passHref key={user.id}>
                            <div  className="bg-white shadow-card p-5 rounded-xl border border-gray-200">
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