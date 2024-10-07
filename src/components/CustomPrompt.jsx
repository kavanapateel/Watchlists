import { useState } from "react"
import PropTypes from "prop-types"

const CustomPrompt = ({ onClose, onConfirm }) => {
  const [inputValue, setInputValue] = useState("")

  const handleConfirm = () => {
    if (inputValue) {
      onConfirm(inputValue)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-white p-6 shadow-md">
        <h3 className="font-head text-lg font-bold">
          Create new{" "}
          <span className="capitalize text-orange-600">Watchlist</span>
        </h3>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="mt-4 w-full rounded border p-2 outline-1 outline-orange-600 focus:outline"
          placeholder="To-watch list"
          required
        />
        <div className="mt-4 flex justify-end gap-2 *:rounded *:px-4 *:py-2 *:outline-none">
          <button onClick={onClose}>Cancel</button>
          <button
            className="bg-orange-600 px-4 py-2 text-white"
            onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

CustomPrompt.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default CustomPrompt
