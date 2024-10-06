import { create } from "zustand"

const useStore = create((set) => ({
  movies: [],
  watchlist: [],
  selectedMovie: null,
  searchResults: [],
  email: null,

  setSelectedMovie: (movie) => set({ selectedMovie: movie }),

  setSearchResults: (results) => set({ searchResults: results }),

  setEmail: (email) => {
    set({ email })

    const storedWatchlist =
      JSON.parse(localStorage.getItem(`watchlist_${email}`)) || []
    set({ watchlist: storedWatchlist })
  },

  clearEmail: () => {
    set({ email: null, watchlist: [] })
  },

  addMovie: (movie) =>
    set((state) => {
      const exists = state.watchlist.some((m) => m.imdbID === movie.imdbID)
      if (!exists) {
        const newWatchlist = [...state.watchlist, movie]

        localStorage.setItem(
          `watchlist_${state.email}`,
          JSON.stringify(newWatchlist),
        )
        return { watchlist: newWatchlist }
      }
      return state
    }),

  removeMovie: (id) =>
    set((state) => {
      const newWatchlist = state.watchlist.filter(
        (movie) => movie.imdbID !== id,
      )

      localStorage.setItem(
        `watchlist_${state.email}`,
        JSON.stringify(newWatchlist),
      )
      return { watchlist: newWatchlist }
    }),

  setMovies: (movies) => set({ movies }),
}))

export default useStore
