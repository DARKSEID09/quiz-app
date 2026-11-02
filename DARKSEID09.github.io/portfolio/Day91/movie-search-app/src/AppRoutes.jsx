import { Routes, Route } from "react-router-dom";
import { useFavourites } from "./context/FavouritesContext";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Favourites from "./components/Favourites";
import MovieDetail from "./pages/MovieDetail";
import NotFound from "./pages/NotFound";

function FavouritesPage() {
  const { favourites, removeFavourite } = useFavourites();

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