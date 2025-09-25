import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className=" mt-0 md:-mt-35 pl-4 md:pl-12 relative text-white">
          <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
          <MovieList title="Trending" movies={movies.trending} />
          <MovieList title="Popular" movies={movies.popularMovies} />
          <MovieList title="Top Rated Movies" movies={movies.topRated} />
          <MovieList title="Top Rated Series" movies={movies.topSeries} />
          <MovieList title="Upcoming" movies={movies.upcoming} />
        </div>
      </div>
    )
  );
};
export default SecondaryContainer;