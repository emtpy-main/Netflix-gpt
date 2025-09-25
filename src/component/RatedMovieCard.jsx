import MovieCard from "./MovieCard";
import { IoLogoYoutube } from "react-icons/io";
import { Api_options } from "../utils/constants";
import { addTrailerVideo } from "../utils/gptSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const withRating = (WrappedComponent) => {
  return function EnhancedComponent({ movie, ...props }) {
    const dispatch = useDispatch();
    const trailerVideoId = useSelector((state) => state.gpt.trailerVideo);

    useEffect(() => {
      if (trailerVideoId) {
        window.open(
          `https://www.youtube.com/watch?v=${trailerVideoId}`,
          "_blank"
        );
      }
    }, [trailerVideoId]);

    const handleTrailer = async (movieId) => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          Api_options
        );
        const data = await res.json();

        const trailer =
          data.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          ) || data.results[0];

        dispatch(addTrailerVideo(trailer?.key || null));
      } catch (err) {
        console.error("Error fetching movie trailer:", err);
      }
    };

    const { vote_average, release_date } = movie;

    return (
      <div
        className="relative rounded-md flex-shrink-0"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        }}
      >
        <WrappedComponent movie={movie} {...props} />

        {/* Responsive Rating Container */}
        <div
          className="absolute bottom-2 left-2 bg-black/70 text-white px-2 sm:px-3 py-1 sm:py-1.5 
                     rounded-md text-xs sm:text-sm md:text-md z-20 md:p-1 md:bottom-1 md:left-1
                     flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3"
        >
          <div className="flex flex-col md-flex-none">
              {/* Rating */}
          <span className="whitespace-nowrap">
            ⭐ {vote_average?.toFixed(1)}
          </span>

          {/* Release Year */}
          <span className="whitespace-nowrap">
            📅 {release_date?.slice(0, 4)}
          </span>
          </div>

          {/* Trailer Button */}
          <button
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 
                       text-white rounded-md px-2 py-[2px] sm:px-3 sm:py-1 
                       transition font-semibold cursor-pointer text-xs sm:text-sm md:text-base"
            onClick={() => handleTrailer(movie.id)}
          >
            <IoLogoYoutube className="text-base sm:text-lg md:text-xl" />
            <span>Trailer</span>
          </button>
        </div>
      </div>
    );
  };
};

export default withRating(MovieCard);
