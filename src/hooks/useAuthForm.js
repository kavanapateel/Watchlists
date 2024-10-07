import { useState } from "react"
import useStore from "../store/useStore"

const useAuthForm = () => {
  const { email, clearEmail, setEmail, addMovie, removeMovie } = useStore()
  const [showAuthForm, setShowAuthForm] = useState(false)

  const toggleAuthForm = () => {
    setShowAuthForm((prev) => !prev)
  }

  const handleSubmit = (emailInput, onClose) => {
    if (emailInput) {
      setEmail(emailInput)
      onClose()
    }
  }

  const handleLogout = (navigate) => {
    clearEmail()
    navigate("/")
  }

  const handleWatchlistAction = (isInWatchlist, movie, handleOpenAuthForm) => {
    if (email) {
      isInWatchlist ? removeMovie(movie.imdbID) : addMovie(movie)
    } else {
      handleOpenAuthForm()
    }
  }

  return {
    email,
    showAuthForm,
    toggleAuthForm,
    handleSubmit,
    handleLogout,
    handleWatchlistAction,
  }
}

export default useAuthForm
