import { useNavigate } from "react-router-dom"
import MovieList from "../components/MovieList"
import useStore from "../store/useStore"
import { useEffect } from "react"

const Watchlist = () => {
  const { email } = useStore()
  const watchlist = useStore((state) => state.watchlist)
  const navigate = useNavigate()

  useEffect(() => {
    if (!email) {
      navigate("/")
    }
  }, [email, navigate])

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      {watchlist.length > 0 ? (
        <div className="flex w-full flex-col items-center justify-start overflow-x-hidden">
          <h2 className="mb-2 w-full font-head text-2xl font-semibold">
            My <span className="text-orange-600">Watchlists</span>
          </h2>
          <MovieList movies={watchlist} />
        </div>
      ) : (
        <p className="text-gray-500">Your watchlist is empty.</p>
      )}
    </div>
  )
}

export default Watchlist
