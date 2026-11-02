import { Link } from "react-router-dom";
function MovieCard({ movie, onAddFavourite }) {
  return (
    <div className="movie-card">
      <h3><Link to ={"/movie/`" + movie.imdbID}>{movie.Title}</Link></h3>
      <p>Year: {movie.Year}</p>

      {movie.Poster && movie.Poster !== "N/A" ? (
        <img
          src={movie.Poster}
          alt={`${movie.Title} poster`}
          width="150"
        />
      ) : (
        <p>Poster unavailable</p>
      )}

      {onAddFavourite && (
        <button onClick={() => onAddFavourite(movie)}>
          Add to Favourites
        </button>
      )}
    </div>
  );
}

export default MovieCard;