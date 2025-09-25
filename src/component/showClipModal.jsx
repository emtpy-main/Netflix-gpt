import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { closeClip } from "../utils/clipSlice";
import { ImCross } from "react-icons/im";
import { useState, useEffect } from "react";

const ShowClipModal = () => {
  const dispatch = useDispatch();

  const { selectedMovie, movieVideos, isClipOpen } = useSelector(
    (state) => state.clip
  );

  const [activeVideo, setActiveVideo] = useState(null);

  // Pick trailer or fallback
  useEffect(() => {
    if (!movieVideos || movieVideos.length === 0) return;

    const youtubeTrailer = movieVideos.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );

    if (youtubeTrailer) {
      setActiveVideo(youtubeTrailer);
    } else {
      setActiveVideo(movieVideos[0]);
    }
  }, [movieVideos]);
  if (!selectedMovie || !activeVideo) return null;
  const { title, overview, vote_average, popularity, release_date } =
    selectedMovie;

  return (
    <AnimatePresence>
      {isClipOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center mt-2 bg-black/80 overflow-y-auto scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full md:w-3/4 lg:w-2/3 bg-gray-900 rounded-xl shadow-lg overflow-hidden my-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-gray-700">
              <h2 className="text-white text-2xl font-bold">
                {selectedMovie.title}
              </h2>
              <button
                className="text-gray-400 hover:text-red-500 text-2xl"
                onClick={() => dispatch(closeClip())}
              >
                <ImCross />
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.key}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                title="movie trailer"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            {/* Movie Details */}
            <div className="flex gap-2 sm:flex-row sm:gap-6 text-sm sm:text-base text-gray-400 mb-4">
              <span>⭐ Rating: {vote_average?.toFixed(1) || "N/A"}</span>
              <span>🔥 Popularity: {Math.round(popularity) || "N/A"}</span>
              <span>📅 Release: {release_date?.slice(0, 4) || "N/A"}</span>
            </div>

            {/* Tabs */}
            <div className="flex flex-nowrap space-x-2 px-3 py-2 overflow-x-auto max-w-full scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-800">
              {movieVideos.map((v) => (
                <button
                  key={v.id}
                  className={`px-2 py-1 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                    activeVideo.id === v.id
                      ? "bg-red-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => setActiveVideo(v)}
                >
                  {v.type}
                </button>
              ))}
            </div>
            {/* Movie Info */}
            <div className="p-4 text-gray-300 text-sm max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-800">
              <h3 className="text-2xl text-red-700 md-text-3xl">Overview</h3>
              <p>{selectedMovie.overview}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShowClipModal;
