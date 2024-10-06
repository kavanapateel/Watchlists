import { useNavigate } from "react-router-dom"
import useStore from "../store/useStore"
import Background from "/bg.jpg"
import { useState, useEffect } from "react"
import AuthForm from "./AuthForm"

const PlotCard = () => {
  const {
    selectedMovie: movie,
    watchlist,
    addMovie,
    removeMovie,
    email,
  } = useStore()
  const navigate = useNavigate()
  const [isAuthFormOpen, setAuthFormOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const isInWatchlist = movie
    ? watchlist.some((m) => m.imdbID === movie.imdbID)
    : false

  const handleOpenAuthForm = () => {
    setAuthFormOpen(true)
  }

  const handleCloseAuthForm = () => {
    setAuthFormOpen(false)
  }

  if (!movie) {
    return (
      <div className="w-full p-6">
        <p>Movie not found</p>
      </div>
    )
  }

  const posterSrc =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : Background

  return (
    <div className="animate-view relative flex w-full flex-col items-start justify-between sm:flex-row">
      <button
        onClick={() => navigate(-1)}
        className="material-symbols-outlined absolute left-0 top-0 z-20 rounded-ee bg-orange-500 p-4 text-slate-50 shadow">
        arrow_back_ios_new
      </button>

      <img
        src={posterSrc}
        className="animate-slideIn left-0 top-0 z-10 w-full object-cover object-center sm:sticky sm:h-screen sm:max-w-md"
        role="presentation"
      />

      <div className="animate-fadeIn flex h-full w-full flex-col items-start justify-evenly p-4 *:w-full">
        <div className="flex flex-col items-start justify-center gap-2">
          <p className="flex flex-1 items-start justify-start gap-2 px-2 font-head text-2xl font-bold sm:text-4xl">
            <span>{movie.Title}</span>
            <button
              onClick={() =>
                email
                  ? isInWatchlist
                    ? removeMovie(movie.imdbID)
                    : addMovie(movie)
                  : handleOpenAuthForm()
              }>
              {isInWatchlist ? (
                <span className="material-symbols-outlined">bookmark</span>
              ) : (
                <span className="material-symbols-outlined">bookmark</span>
              )}
            </button>
          </p>

          <div className="flex items-center justify-start gap-2 px-2 pb-2">
            <p className="flex items-end justify-end font-medium">
              <span className="material-symbols-outlined">star_half</span>
              <span className="leading-6">
                {movie?.imdbRating !== "N/A" ? movie.imdbRating : "??"}/10
              </span>
            </p>
            <span className="aspect-square w-1 rounded-full bg-slate-900" />
            <p className="">{movie.Runtime}</p>

            <span className="aspect-square w-1 rounded-full bg-slate-900" />
            <p className="uppercase">{movie.Rated}</p>

            <span className="aspect-square w-1 rounded-full bg-slate-900" />
            <p className="">{movie.Year}</p>
          </div>
        </div>

        <p className="flex-1 px-2 text-lg">{movie.Plot}</p>

        <div className="misc-data flex flex-1 flex-col gap-2">
          <div className="cast grid grid-cols-[auto,1fr] items-center justify-center gap-2 px-2">
            <p>Director:</p>
            <p>{movie.Director}</p>
            <p>Writers:</p>
            <p>{movie.Writer}</p>
            <p>Actors:</p>
            <p>{movie.Actors}</p>
            <p>Languages:</p>
            <p>{movie.Language}</p>
          </div>

          <div className="chipset flex flex-wrap items-center justify-start gap-1">
            {movie?.Genre.split(",").map((genre) => (
              <p key={genre} className="rounded-full border px-2 py-0.5">
                {genre.trim()}
              </p>
            ))}
          </div>
        </div>
      </div>
      {isAuthFormOpen && <AuthForm onClose={handleCloseAuthForm} />}
    </div>
  )
}

export default PlotCard
