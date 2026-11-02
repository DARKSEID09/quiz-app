export default function Favourites({ movies = [], onRemove }) {
  return (
    <div>
      <h2>My Favourites</h2>

      {movies.length === 0 ? (
        <p>No favourite movies yet.</p>
      ) : (
        movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <h3>{movie.Title}</h3>
            <p>Year: {movie.Year}</p>

            {movie.Poster && movie.Poster !== "N/A" && (
              <img
                src={movie.Poster}
                alt={movie.Title}
                width="150"
              />
            )}

            <button onClick={() => onRemove(movie.imdbID)}>
              Remove from Favourites
            </button>
          </div>
        ))
      )}
    </div>
  );
}