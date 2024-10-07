import React, { Suspense } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import SplashScreen from "./pages/Splashscreen"

const HomePage = React.lazy(() => import("./pages/HomePage"))
const Watchlist = React.lazy(() => import("./pages/WatchList"))
const Navbar = React.lazy(() => import("./components/Navbar"))
const PlotCard = React.lazy(() => import("./components/PlotCard"))

const App = () => {
  return (
    <Router>
      <div className="relative flex h-full w-full flex-col items-start justify-start sm:flex-row">
        <Suspense fallback={<SplashScreen />}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/movie/:imdbID" element={<PlotCard />} />
            <Route path="*" element={<Navigate to={"/"} replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
