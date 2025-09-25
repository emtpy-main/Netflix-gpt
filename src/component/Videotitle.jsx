import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import useClipPlayer from "../hooks/useClipPlayer"; // adjust path if hook is in another folder

const VideoTitle = ({ movie }) => {
  const [expanded, setExpanded] = useState(false);
  const handleClip = useClipPlayer();

  if (!movie) return null;

  const { original_title, overview, id } = movie;

  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black group">
      <h1 className="text-2xl md:text-6xl font-bold mb-2">{original_title}</h1>

      {/* Overview hidden on small screens */}
      <p
        className={`
          hidden sm:block py-6 text-lg w-1/4 transition-all duration-500 ease-in-out
          ${expanded ? "line-clamp-none" : "sm:group-hover:line-clamp-2"}
        `}
      >
        {overview}
      </p>

      <div className="my-4 md:m-0 flex gap-4">
        <button
          className="bg-white flex gap-2 items-center text-black py-1 md:py-4 px-3 md:px-12 text-xl rounded-lg hover:bg-opacity-80 cursor-pointer"
          onClick={() => handleClip(movie, id)}
        >
          <FaPlay /> Play
        </button>

        <button
          onClick={() => setExpanded(!expanded)}
          className="hidden md:flex items-center gap-2 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg hover:bg-opacity-70 cursor-pointer"
        >
          <FaCircleInfo className="text-red-500" />
          {expanded ? "Hide Info" : "More Info"}
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
