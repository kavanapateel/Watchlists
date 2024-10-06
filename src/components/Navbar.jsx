import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthForm from "../components/AuthForm"
import useStore from "../store/useStore"

const Navbar = () => {
  const navigate = useNavigate()
  const { email, clearEmail } = useStore()
  const [showAuthForm, setShowAuthForm] = useState(false)

  const handleAuthFormToggle = () => {
    setShowAuthForm((prev) => !prev)
  }

  const handleLogout = () => {
    clearEmail()
    navigate("/")
  }

  return (
    <>
      <nav className="sticky left-0 top-0 hidden h-screen w-1/5 flex-col items-center justify-start gap-4 rounded-e border p-4 sm:flex">
        <h1 className="text-3xl font-bold text-orange-600">Watchlists</h1>
        {/* <input
          type="text"
          className="mb-2 w-full rounded border p-2 outline-1 outline-orange-500 focus:outline"
          placeholder="Search"
        /> */}
        <Link
          to={"/"}
          className="flex w-full items-center justify-start gap-1 rounded bg-orange-500 p-2 text-slate-50">
          <span className="material-symbols-outlined">home</span>Home
        </Link>

        {email && (
          <>
            <span className="divider h-px w-full border" />
            <div className="flex h-full w-full flex-col items-start justify-start gap-1 overflow-auto">
              {/* <h2 className="sticky top-0 w-full bg-white indent-2 text-xl font-medium">
                My Lists
              </h2> */}
              <Link
                to={"/watchlist"}
                className="flex w-full items-center justify-start gap-1 rounded border p-2">
                My WatchList
              </Link>
            </div>
          </>
        )}

        <div
          className={`relative mt-auto flex w-full items-center justify-start gap-1 rounded border px-1 py-2 ${email && "bg-orange-500 text-white"}`}>
          <span className="material-symbols-outlined">account_circle</span>
          <p
            className={`max-w-[15ch] flex-1 truncate font-head text-sm ${!email && "cursor-pointer"}`}
            onClick={!email && handleAuthFormToggle}>
            {email ? email : "Register / Login"}
          </p>
          {email && (
            <>
              <label
                htmlFor="logout-btn"
                className="material-symbols-outlined select-none text-sm">
                more_horiz
              </label>
              <input type="checkbox" id="logout-btn" className="peer hidden" />
              <button
                className="absolute -top-10 right-0 hidden w-full items-end justify-end rounded border bg-slate-50 p-1 text-slate-950 peer-checked:flex"
                onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
      {showAuthForm && <AuthForm onClose={handleAuthFormToggle} />}
    </>
  )
}

export default Navbar
