import { useState } from "react"
import useStore from "../store/useStore"
import PropTypes from "prop-types"

const AuthForm = ({ onClose }) => {
  const [emailInput, setEmailInput] = useState("")
  const setEmail = useStore((state) => state.setEmail)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (emailInput) {
      setEmail(emailInput)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 font-head text-xl font-bold">Register / Login</h2>
        <form onSubmit={handleSubmit}>
          <label className="mb-2 block">
            Provide email to save your watchlist
          </label>
          <input
            type="email"
            className="mb-4 w-full rounded border border-gray-300 p-2 outline-1 outline-orange-500 focus:outline"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
          />
          <div className="flex justify-end *:outline-none">
            <button
              type="button"
              tabIndex={1}
              className="mr-2 p-2 text-gray-600 focus:drop-shadow-[0_0_1px_#f97316]"
              onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              tabIndex={0}
              className="rounded bg-orange-500 p-2 text-white focus:drop-shadow-[0_0_1px_#f97316]">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

AuthForm.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default AuthForm
