import { useState } from "react"
import SearchBar from "../components/Searchbar"
import MovieList from "../components/MovieList"
import useStore from "../store/useStore"

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const setSearchResults = useStore((state) => state.setSearchResults)
  const searchResults = useStore((state) => state.searchResults)

  const handleSearch = async (results) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSearchResults(results)
    setIsLoading(false)
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-start p-6">
      <div className="w-full rounded border border-orange-500 p-4 pb-6">
        <h3 className="mb-4 text-3xl font-medium">
          Welcome to{" "}
          <span className="font-semibold text-orange-500">Watchlists</span>
        </h3>
        <p>
          Browse movies, add them to watchlists and share them with friends.
        </p>
        <p className="flex flex-wrap items-center justify-start">
          Just click the{" "}
          <span className="material-symbols-outlined text-sm">
            bookmark_add
          </span>{" "}
          to add a movie, the poster to see more details or to mark the movie as
          watched.
        </p>
      </div>
      <SearchBar onSearch={handleSearch} />

      {isLoading ? (
        <div className="h- flex w-full flex-1 items-center justify-center">
          <div className="loader" />
        </div>
      ) : (
        searchResults.length > 0 && <MovieList movies={searchResults} />
      )}
    </div>
  )
}

export default HomePage
