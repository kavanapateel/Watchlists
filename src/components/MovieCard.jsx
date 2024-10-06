import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import useStore from "../store/useStore"
import Background from "/bg.jpg"
import { useState } from "react"
import AuthForm from "./AuthForm"

const MovieCard = ({ movie, isInWatchlist }) => {
  const { addMovie, removeMovie, setSelectedMovie, email } = useStore()
  const navigate = useNavigate()
  const [isAuthFormOpen, setAuthFormOpen] = useState(false)

  const posterSrc =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : Background

  const handleViewDetails = () => {
    setSelectedMovie(movie)
    navigate(`/movie/${movie.imdbID}`)
  }

  const handleWatchlist = (e) => {
    e.stopPropagation()
    email
      ? isInWatchlist
        ? removeMovie(movie.imdbID)
        : addMovie(movie)
      : handleOpenAuthForm()
  }

  const handleOpenAuthForm = () => {
    setAuthFormOpen(true)
  }

  const handleCloseAuthForm = () => {
    setAuthFormOpen(false)
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden rounded rounded-t-none shadow">
      <div
        className="flex h-full w-full cursor-pointer flex-col items-center justify-start"
        onClick={handleViewDetails}>
        <img
          src={posterSrc}
          className="h-[350px] w-full object-cover object-center"
          alt={movie.imdbID}
          role="presentation"
        />
        <p className="w-full p-2 font-medium">{`${movie.Title} (${movie.Year})`}</p>
      </div>

      <div className="flex w-full items-center justify-center gap-2 bg-orange-500 px-2 pb-3 pt-1 text-slate-50">
        <p className="flex flex-1 flex-wrap items-end justify-start font-medium">
          <span className="material-symbols-outlined">star_half</span>
          {movie?.imdbRating !== "N/A" ? movie.imdbRating : "??"}/10
        </p>
        <button
          className={`flex items-center justify-center rounded-full`}
          onClick={handleWatchlist}>
          {isInWatchlist ? (
            <span className="material-symbols-outlined">done_all</span>
          ) : (
            <span className="material-symbols-outlined">bookmark</span>
          )}
        </button>
      </div>
      {isAuthFormOpen && <AuthForm onClose={handleCloseAuthForm} />}
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
