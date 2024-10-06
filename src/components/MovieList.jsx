import useStore from "../store/useStore"
import MovieCard from "./MovieCard"
import PropTypes from "prop-types"

const MovieList = ({ movies }) => {
  const watchlist = useStore((state) => state.watchlist)
  const setSelectedMovie = useStore((state) => state.setSelectedMovie)

  return (
    <div className="grid w-full grid-cols-1 items-start justify-start gap-4 sm:auto-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => {
        const isInWatchlist = watchlist.some(
          (watch) => watch.imdbID === movie.imdbID,
        )
        return (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isInWatchlist={isInWatchlist}
            onClick={() => setSelectedMovie(movie)}
          />
        )
      })}
    </div>
  )
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default MovieList
