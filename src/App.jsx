import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import Watchlist from "./pages/WatchList"
import PlotCard from "./components/PlotCard"

const App = () => {
  return (
    <Router>
      <div className="relative flex h-full w-full items-start justify-start">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/movie/:imdbID" element={<PlotCard />} />
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
