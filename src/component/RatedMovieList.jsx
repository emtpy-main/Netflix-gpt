 import RatedMovieCard from "./RatedMovieCard";

const RatedMovieList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className="px-6">
      <h2 className="text-white text-2xl md:text-2xl font-bold mb-4 mt-1">{title}</h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide overflow-y-visible relative flex-nowrap ">
        {movies.map((movie) => (
          <RatedMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default RatedMovieList;
