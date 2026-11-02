
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import "./App.css";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favourites")) || [];
    } catch {
      return [];
    }
  });

  function saveFavourites(updatedFavourites) {
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  }

  function addFavourite(movie) {
    if (!favourites.some((item) => item.imdbID === movie.imdbID)) {
      saveFavourites([...favourites, movie]);
    }
  }

  function removeFavourite(imdbID) {
    saveFavourites(favourites.filter((movie) => movie.imdbID !== imdbID));
  }

  async function searchMovies(title) {
    if (!title.trim()) {
      setError("Please enter a movie title.");
      setMovies([]);
      return;
    }

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(title)}`;

const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search || []);
      } else {
        setError(data.Error || "No movies found.");
      }
    } catch (err) {
      console.error("Movie search error:", err);
      setError("Something went wrong. Please try again." + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>Movie Search App</h1>
      <SearchBar onSearch={searchMovies} />
      {loading && <p>Loading movies...</p>}
      {error && <p className="error">{error}</p>}
      <MovieList movies={movies} onAddFavourite={addFavourite} />
    </div>
  );
}

export { App };