interface SearchBarProps {
    search: string;
    setSearch: (search: string) => void;
    placeholderText: string;
}

export const SearchBar = ({search, setSearch, placeholderText}: SearchBarProps) => {    

    return (
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={placeholderText || "Search..."}
          className="border border-gray-300 rounded-xl p-3 w-full sm:w-auto flex-grow"
        />
        <button className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition">
          Search
        </button>
      </div>
    )
};