import MovieCard from "./MovieCard"
const MovieList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className="px-6">
      <h2 className="text-white text-2xl md:text-2xl font-bold mb-4 mt-1">{title}</h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide overflow-y-visible relative">
        {movies.map((movie) => ( 
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
