import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useMatch } from "react-router-dom"
import AuthForm from "../components/AuthForm"
import useAuthForm from "../hooks/useAuthForm"

const Navbar = () => {
  const navigate = useNavigate()
  const { email, showAuthForm, toggleAuthForm, handleSubmit, handleLogout } =
    useAuthForm()
  const [isLogoutMenuOpen, setLogoutMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isNavbarOpen, setNavbarOpen] = useState(false)
  const navbarRef = useRef(null)

  const toggleLogoutMenu = () => {
    setLogoutMenuOpen((prev) => !prev)
  }

  const getWindowWidth = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener("resize", getWindowWidth)
    return () => {
      window.removeEventListener("resize", getWindowWidth)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setNavbarOpen(false)
      }
    }

    if (isNavbarOpen) {
      window.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isNavbarOpen])

  const isMobile = windowWidth < 768
  const isMoviePage = useMatch("/movie/*")

  return (
    <>
      {isMobile && !isMoviePage && (
        <button
          className={`material-symbols-outlined fixed top-16 z-[999] rounded bg-orange-600 p-2 text-white transition duration-300 ease-in-out ${isNavbarOpen && "hidden"}`}
          onClick={() => setNavbarOpen((prev) => !prev)}>
          menu
        </button>
      )}

      {isMobile && !isMoviePage && (
        <div
          ref={navbarRef}
          className={`fixed left-0 top-0 z-50 h-full bg-orange-600 text-white transition-all duration-300 ease-in-out ${
            isNavbarOpen ? "w-full" : "w-0"
          } overflow-hidden`}>
          <div className="flex h-full flex-col p-4">
            <h1 className="mb-4 w-full text-center font-head text-3xl font-bold">
              Watchlists
            </h1>
            <Link
              to="/"
              className="flex items-center justify-start gap-1 rounded p-2 text-xl transition duration-200 hover:bg-orange-500"
              onClick={() => setNavbarOpen(false)}>
              <span className="material-symbols-outlined" aria-label="Home">
                home
              </span>
              Home
            </Link>

            {email ? (
              <>
                <Link
                  to="/watchlist"
                  className="flex items-center justify-start gap-1 rounded p-2 text-xl transition duration-200 hover:bg-orange-500"
                  onClick={() => setNavbarOpen(false)}>
                  <span
                    className="material-symbols-outlined"
                    aria-label="My WatchList">
                    checklist
                  </span>
                  My WatchList
                </Link>
                <button
                  className="mt-2 flex w-full items-center justify-center rounded border border-red-600 bg-white p-2 text-red-600 transition duration-200 hover:bg-red-500 hover:text-white"
                  onClick={() => handleLogout(navigate)}>
                  Logout
                </button>
              </>
            ) : (
              <button
                className="mt-auto flex items-center justify-center gap-2 rounded bg-white py-2 font-head text-xl uppercase text-orange-600 transition duration-200 hover:bg-orange-500"
                onClick={toggleAuthForm}>
                <span className="material-symbols-outlined text-2xl">
                  account_circle
                </span>
                Register / Login
              </button>
            )}
          </div>
        </div>
      )}

      {!isMobile && (
        <nav className="sticky left-0 top-0 flex h-screen w-max min-w-max flex-col items-center justify-start gap-4 rounded-e border p-4">
          <h1 className="mb-2 w-full px-3 font-head text-3xl font-bold text-orange-600">
            Watchlists
          </h1>
          <Link
            to="/"
            className="flex w-full items-center justify-start gap-1 rounded bg-orange-600 p-2 text-slate-50 focus:outline-none"
            tabIndex={-1}>
            <span className="material-symbols-outlined" aria-label="Home">
              home
            </span>
            Home
          </Link>

          {email && (
            <>
              <span className="divider h-px w-full border" />
              <div className="flex h-full w-full flex-col items-start justify-start gap-1 overflow-auto">
                <h2 className="sticky top-0 w-full bg-white indent-2 text-xl font-medium">
                  My Lists
                </h2>
                <Link
                  to="/watchlist"
                  className="flex w-full items-center justify-start gap-1 rounded border p-2">
                  My WatchList
                </Link>
              </div>
            </>
          )}

          <div
            className={`relative mt-auto flex w-full items-center justify-start gap-1 rounded border px-1 py-2 ${email ? "bg-orange-600 text-white" : ""}`}>
            <span className="material-symbols-outlined" aria-label="Account">
              account_circle
            </span>
            <p
              className={`max-w-[15ch] flex-1 truncate font-head ${!email ? "cursor-pointer" : ""}`}
              onClick={!email && toggleAuthForm}>
              {email || "Register / Login"}
            </p>

            {email && (
              <>
                <button
                  className="material-symbols-outlined select-none text-base"
                  aria-label="More options"
                  onClick={toggleLogoutMenu}>
                  more_horiz
                </button>
                {isLogoutMenuOpen && (
                  <button
                    className="absolute -top-10 right-0 flex w-full items-end justify-end rounded border bg-slate-50 p-1 text-slate-950"
                    onClick={() => handleLogout(navigate)}>
                    Logout
                  </button>
                )}
              </>
            )}
          </div>
        </nav>
      )}

      {showAuthForm && (
        <AuthForm onSubmit={handleSubmit} onClose={toggleAuthForm} />
      )}
    </>
  )
}

export default Navbar
