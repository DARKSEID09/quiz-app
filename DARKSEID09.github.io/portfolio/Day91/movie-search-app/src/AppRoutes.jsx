import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./layouts/Layout";
import App from "./App";
import Favourites from "./components/Favourites";
import MovieDetail from "./pages/MovieDetail";
import NotFound from "./pages/NotFound";

function Home() {
  return <App />;
}

function FavouritesPage() {
  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favourites")) || [];
    } catch {
      return [];
    }
  });

  function removeFavourite(imdbID) {
    const updatedFavourites = favourites.filter(
      (movie) => movie.imdbID !== imdbID
    );

    setFavourites(updatedFavourites);

    localStorage.setItem(
      "favourites",
      JSON.stringify(updatedFavourites)
    );
  }

  return (
    <Favourites
      movies={favourites}
      onRemove={removeFavourite}
    />
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="movie/:id" element={<MovieDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}