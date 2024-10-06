import MovieList from "../components/MovieList"
import AuthForm from "../components/AuthForm"
import useStore from "../store/useStore"
import { useState } from "react"

const Watchlist = () => {
  const { email } = useStore()
  const watchlist = useStore((state) => state.watchlist)
  const [isAuthFormOpen, setAuthFormOpen] = useState(false)

  const handleOpenAuthForm = () => {
    setAuthFormOpen(true)
  }

  const handleCloseAuthForm = () => {
    setAuthFormOpen(false)
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      {email ? (
        <>
          {watchlist.length > 0 ? (
            <div className="flex h-full w-full flex-col items-center justify-start overflow-x-hidden">
              <h2 className="mb-2 w-full font-head text-2xl">My Watchlist</h2>
              <MovieList movies={watchlist} />
            </div>
          ) : (
            <p>Your watchlist is empty.</p>
          )}
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <p>Please log in to see your watchlist.</p>
          <button
            className="rounded bg-orange-500 p-2 text-white"
            onClick={handleOpenAuthForm}>
            Login/Register
          </button>
          {isAuthFormOpen && <AuthForm onClose={handleCloseAuthForm} />}
        </div>
      )}
    </div>
  )
}

export default Watchlist
