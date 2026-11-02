import { createContext, useContext, useState } from "react";

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favourites")) || [];
    } catch {
      return [];
    }
  });

  function addFavourite(movie) {
    const alreadyAdded = favourites.some(
      (item) => item.imdbID === movie.imdbID
    );

    if (!alreadyAdded) {
      const updated = [...favourites, movie];
      setFavourites(updated);
      localStorage.setItem("favourites", JSON.stringify(updated));
    }
  }

  function removeFavourite(imdbID) {
    const updated = favourites.filter(
      (movie) => movie.imdbID !== imdbID
    );

    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  }

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavouritesContext);
}