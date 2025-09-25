import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { image_cdn } from "../utils/constants";
import useClipPlayer from "../hooks/useClipPlayer";

const MovieCard = ({ movie, index }) => {
  const [expanded, setExpanded] = useState(false);
  const handleClip = useClipPlayer();

  if (!movie || !movie.poster_path) return null;

  return (
    <div className="relative group w-[140px] md:w-[170px] lg:w-[190px] flex-shrink-0 cursor-pointer">
      <img
        alt={movie.title}
        src={image_cdn + movie.poster_path}
        className="rounded-md w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Hover Overlay */}
      <div
        className={`
          absolute top-0 left-1/2 -translate-x-1/2
          w-[200px] md:w-[240px] lg:w-[280px]
          opacity-0 scale-90 group-hover:scale-105 group-hover:opacity-100
          transition-all duration-300 ease-in-out
          bg-black/90 rounded-md shadow-xl
          flex flex-col justify-end p-3 text-white z-20 pointer-events-none
        `}
        style={{ transformOrigin: index < 2 ? "left" : "center" }}
      >
        <h3 className="text-sm md:text-base font-bold mb-2">{movie.title}</h3>

        {/* Overview */}
        <p
          className={`text-xs md:text-sm mb-3 transition-all duration-300 ease-in-out ${
            expanded ? "line-clamp-none" : "line-clamp-3"
          }`}
        >
          {movie.overview}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 pointer-events-auto">
          <button
            className="bg-white text-black px-2 py-1 text-xs md:text-sm rounded-md flex items-center gap-1 hover:bg-white/80 cursor-pointer"
            onClick={() => handleClip(movie, movie.id)}
          >
            <FaPlay className="w-3 h-3 md:w-4 md:h-4" /> Play
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="bg-gray-700/70 px-2 py-1 text-xs md:text-sm rounded-md flex items-center gap-1 hover:bg-gray-600/80 cursor-pointer"
          >
            <FaCircleInfo className="text-red-500 w-3 h-3 md:w-4 md:h-4" />
            {expanded ? "Hide" : "More Info"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
