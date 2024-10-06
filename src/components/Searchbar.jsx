import { useState, useRef } from "react"
import axios from "axios"
import PropTypes from "prop-types"

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Reference to keep track of the previous query
  const prevQueryRef = useRef("")

  const fetchMovies = async () => {
    if (query.trim() === "") return

    try {
      setLoading(true)
      setError(null)

      const url = `https://www.omdbapi.com/?s=${query.trim()}&apikey=${
        import.meta.env.VITE_OMDB_API
      }&plot=full`
      const response = await axios.get(url)

      if (response?.data?.Search) {
        const moviesWithDetails = await Promise.all(
          response.data.Search.map(async (movie) => {
            const movieDetailsUrl = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${import.meta.env.VITE_OMDB_API}`
            const detailsResponse = await axios.get(movieDetailsUrl)
            return detailsResponse.data
          }),
        )
        onSearch(moviesWithDetails)
      } else {
        onSearch([])
        setError("No movies found.")
      }
    } catch (err) {
      console.error("Error fetching data:", err)
      setError("Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()

    // Check if the trimmed query is the same as the previous value
    if (query.trim() === prevQueryRef.current) {
      return // Don't fetch if the value hasn't changed
    }

    // Update the previous query reference
    prevQueryRef.current = query.trim()

    // Fetch movies with the new query
    fetchMovies()
  }

  return (
    <div className="sticky top-0 z-10 h-full w-full bg-white pb-2 pt-4">
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center overflow-hidden rounded border border-orange-500">
        <input
          type="text"
          placeholder="Search for a movie, web series, or an episode"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setError(null)
          }}
          className="input mx-2 w-full flex-1 px-2 outline-none"
          aria-label="Search for movies, series, or episodes"
        />
        <button
          type="submit"
          disabled={loading || query.trim() === ""}
          className="flex items-center justify-center rounded-sm bg-orange-500 px-3 py-1 font-head text-white outline-none transition duration-300 ease-in-out hover:bg-orange-500/75 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            "Search"
          )}
        </button>
      </form>

      {error && <p className="mt-2 text-center text-red-600">{error}</p>}
    </div>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

export default SearchBar
