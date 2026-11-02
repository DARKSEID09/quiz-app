import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("favourites") || "[]"
    );
    setFavourites(saved);
  }, []);

  return (
    <div>
      <h1>My Favourite Movies</h1>
      {favourites.length > 0 ? (
        <MovieList movies={favourites} />
      ) : (
        <p>No favourite movies saved yet.</p>
      )}
    </div>
  );
}