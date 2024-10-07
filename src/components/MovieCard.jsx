import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import useAuthForm from "../hooks/useAuthForm"
import Background from "/bg.jpg"
import AuthForm from "./AuthForm"
import useStore from "../store/useStore"

const MovieCard = ({ movie, isInWatchlist }) => {
  const { showAuthForm, toggleAuthForm, handleSubmit, handleWatchlistAction } =
    useAuthForm()
  const { setSelectedMovie } = useStore()
  const navigate = useNavigate()

  const posterSrc =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : Background

  const handleViewDetails = () => {
    setSelectedMovie(movie)
    navigate(`/movie/${movie.imdbID}`)
  }

  const handleWatchlist = (e) => {
    e.stopPropagation()
    handleWatchlistAction(isInWatchlist, movie, toggleAuthForm)
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden rounded shadow">
      <div
        className="flex h-full w-full cursor-pointer flex-col items-center justify-start"
        onClick={handleViewDetails}>
        <div className="relative flex h-auto w-full items-center justify-center overflow-hidden sm:h-[300px]">
          <div
            className={`absolute left-0 top-0 -z-10 h-full w-full bg-cover bg-center sm:h-[300px]`}
            style={{
              backgroundImage: `url(${posterSrc})`,
              filter: "blur(2px)",
            }}
          />
          <img
            src={posterSrc}
            className="relative z-0 h-auto w-full object-contain object-center"
            alt={`${movie.Title} poster`}
            role="presentation"
            onError={(e) => {
              e.target.src = Background
            }}
          />
        </div>

        <p className="w-full p-2 font-medium">{`${movie.Title} (${movie.Year || "N/A"})`}</p>
      </div>

      <div className="flex w-full items-center justify-center gap-2 bg-orange-600 px-2 pb-3 pt-1 text-slate-50">
        <p className="flex flex-1 flex-wrap items-end justify-start font-medium">
          <span className="material-symbols-outlined">star_half</span>
          {movie?.imdbRating !== "N/A" ? movie.imdbRating : "??"}/10
        </p>
        <button
          className={`flex items-center justify-center rounded-full transition duration-300 ease-in-out hover:bg-orange-500`}
          onClick={handleWatchlist}>
          <span className="material-symbols-outlined">
            {isInWatchlist ? "done_all" : "bookmark"}
          </span>
        </button>
      </div>
      {showAuthForm && (
        <AuthForm onSubmit={handleSubmit} onClose={toggleAuthForm} />
      )}
    </div>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imdbID: PropTypes.string.isRequired,
    Poster: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string,
    imdbRating: PropTypes.string.isRequired,
  }).isRequired,
  isInWatchlist: PropTypes.bool,
}

export default MovieCard
