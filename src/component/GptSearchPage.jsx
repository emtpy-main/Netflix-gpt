import { useSelector } from "react-redux";
import RatedMovieList from "./RatedMovieList";     
import { FaSearch } from "react-icons/fa";
import ShowClipModal from "./showClipModal";

function toTitleCase(str) {
  if (!str) return str;
  return str
    .toLowerCase()
    .trim()
    .replace(/\b[a-z]/g, ch => ch.toUpperCase());
}

const GptSearchPage = () => {
  // Get movie and videos from Redux store
  const { movie, videos } = useSelector((store) => store.clip);
  const { movieName, movieResults } = useSelector((store) => store.gpt);

  if (!movieName) return null;

  return (
    <div className="bg-black/80 p-2 sm:p-3 md:p-4 mt-4 mx-2 sm:mx-4 lg:mx-8 rounded-md">
      {/* Header */}
      <h1 className="flex items-center text-base sm:text-lg md:text-xl font-semibold text-gray-300 mb-3">
        Search Results
        <FaSearch className="ml-2 text-lg sm:text-xl md:text-2xl text-red-600" />
      </h1>

      {/* Movie Lists */}
      <div className="space-y-4">
        {movieName.map((name, index) => (
          <RatedMovieList
            key={index}
            title={toTitleCase(name)}
            movies={movieResults[index]}
          />
        ))}
      </div>

      {/* Modal */}
      <ShowClipModal movie={movie} videos={videos} />
    </div>
  );
};

export default GptSearchPage;
