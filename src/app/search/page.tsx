"use client"
import { useState } from "react";
import { SearchBar } from "../components/UI functions/SearchBar/SearchBar";

export default function SearchPage () {
    const [searchTerm, setSearchTerm] = useState<string>(''); 

    return (
        <div className="bg-background min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-heading text-headertext font-bold mb-6 text-center sm:text-left">Search</h1>
                <SearchBar search={searchTerm} setSearch={setSearchTerm} placeholderText="Search programs, workouts, exercises, tags, users ..."/>
            </div>
        </div>
    )
}