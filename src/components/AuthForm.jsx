import { useState } from "react"
import PropTypes from "prop-types"

const AuthForm = ({ onSubmit, onClose }) => {
  const [emailInput, setEmailInput] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(emailInput, onClose)
  }

  return (
    <div className="fixed inset-0 z-[999] flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="rounded bg-white p-6 shadow-lg sm:w-1/3">
        <div className="flex w-full items-start justify-between">
          <div>
            <h2 className="font-head text-xl font-bold">Register / Login</h2>
            <label className="mb-4 block">
              Provide email to save your watchlist
            </label>
          </div>
          <button
            type="button"
            className="material-symbols-outlined flex items-center justify-center p-0.5 text-base text-orange-600"
            onClick={onClose}>
            close
          </button>
        </div>
        <input
          type="email"
          className="mb-4 w-full rounded border border-gray-300 p-2 outline-1 outline-orange-600 focus:outline"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          required
        />
        <div className="flex w-full flex-row-reverse justify-start gap-2 *:flex *:items-center *:justify-center *:gap-1 *:rounded *:px-2 *:py-1">
          <button
            type="submit"
            className="bg-orange-600 text-white outline-1 outline-slate-50 focus:outline">
            Submit
            <span className="material-symbols-outlined text-base">
              double_arrow
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AuthForm
