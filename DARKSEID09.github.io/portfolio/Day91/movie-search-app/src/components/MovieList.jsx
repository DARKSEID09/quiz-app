import MovieCard from "./MovieCard";

function MovieList({ movies, onAddFavourite }) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onAddFavourite={onAddFavourite}
        />
      ))}
    </div>
  );
}

export default MovieList;