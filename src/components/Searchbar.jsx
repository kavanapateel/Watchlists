import { useState, useRef, useEffect } from "react"
import axios from "axios"
import PropTypes from "prop-types"

const SearchBar = ({
  onSearch,
  setIsLoading,
  currentPage,
  setCurrentPage,
  totalResults,
}) => {
  const [query, setQuery] = useState("")
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const prevQueryRef = useRef("")

  const fetchMovies = async (page = 1) => {
    if (query.trim() === "") return

    try {
      setError(null)
      setIsFetching(true)
      setIsLoading(true)

      const url = `https://www.omdbapi.com/?s=${query.trim()}&apikey=${import.meta.env.VITE_OMDB_API}&page=${page}&plot=full`
      const response = await axios.get(url)

      if (response?.data?.Search) {
        const totalResults = response.data.totalResults || 0
        const moviesWithDetails = await Promise.all(
          response.data.Search.map(async (movie) => {
            const movieDetailsUrl = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${import.meta.env.VITE_OMDB_API}`
            const detailsResponse = await axios.get(movieDetailsUrl)
            return detailsResponse.data
          }),
        )
        onSearch(moviesWithDetails, totalResults)
      } else {
        onSearch([], 0)
        setError("No movies found.")
      }
    } catch (err) {
      console.error("Error fetching data:", err)
      setError("Something went wrong. Please try again later.")
    } finally {
      setIsFetching(false)
      setIsLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim() === prevQueryRef.current) {
      return
    }

    prevQueryRef.current = query.trim()
    setCurrentPage(1)
    fetchMovies(1)
  }

  const handleNextPage = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    fetchMovies(nextPage)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1
      setCurrentPage(prevPage)
      fetchMovies(prevPage)
    }
  }

  const handlePageClick = (page) => {
    setCurrentPage(page)
    fetchMovies(page)
  }

  const totalPages = Math.ceil(totalResults / 10)
  const pageNumbers = [...Array(totalPages).keys()].map((i) => i + 1)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const getTruncatedPageNumbers = () => {
    if (!isMobile || totalPages <= 5) return pageNumbers

    const truncated = []
    const start = Math.max(1, currentPage - 1)
    const end = Math.min(totalPages, currentPage + 1)

    if (start > 2) {
      truncated.push(1)
      if (start > 3) truncated.push("...")
    }

    for (let i = start; i <= end; i++) {
      truncated.push(i)
    }

    if (end < totalPages - 1) {
      if (end < totalPages - 2) truncated.push("...")
      truncated.push(totalPages)
    }

    return truncated
  }

  const truncatedPageNumbers = getTruncatedPageNumbers()

  return (
    <div className="sticky top-0 z-10 h-full w-full bg-white pb-2 pt-4">
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center overflow-hidden rounded border border-orange-600">
        <input
          type="text"
          placeholder="Search for a movie, web series, or an episode"
          value={query}
          autoFocus
          onChange={(e) => {
            setQuery(e.target.value)
            setError(null)
          }}
          className="input mx-2 w-full flex-1 px-2 outline-none"
          aria-label="Search for movies, series, or episodes"
        />
        <button
          type="submit"
          disabled={error || query.trim() === ""}
          className="flex items-center justify-center rounded-sm bg-orange-600 px-3 py-1 font-head text-white outline-none transition duration-300 ease-in-out hover:bg-orange-600/75 disabled:cursor-not-allowed disabled:opacity-50">
          {error ? (
            <span className="material-symbols-outlined">error</span>
          ) : (
            <span className="material-symbols-outlined">search</span>
          )}
        </button>
      </form>

      {error && <p className="mt-2 text-center text-red-600">{error}</p>}

      {!isFetching && totalResults > 0 && (
        <div className="mt-2 flex w-full items-center justify-center gap-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="material-symbols-outlined rounded border border-orange-600 bg-white px-3 py-1 text-orange-600 transition duration-300 ease-in-out hover:bg-orange-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50">
            keyboard_double_arrow_left
          </button>

          {truncatedPageNumbers.map((number, index) => (
            <button
              key={index}
              onClick={() => {
                if (typeof number === "number") {
                  handlePageClick(number)
                }
              }}
              className={`rounded border border-orange-600 px-3 py-1 transition duration-300 ease-in-out hover:bg-orange-600 hover:text-white ${
                currentPage === number
                  ? "bg-orange-600 text-white"
                  : "text-orange-600"
              }`}
              disabled={typeof number === "string"}>
              {number}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={currentPage * 10 >= totalResults}
            className="material-symbols-outlined rounded border border-orange-600 bg-white px-3 py-1 text-orange-600 transition duration-300 ease-in-out hover:bg-orange-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50">
            double_arrow
          </button>
        </div>
      )}
    </div>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired,
}

export default SearchBar
