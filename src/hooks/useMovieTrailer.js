import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { Api_options } from "../utils/constants";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getMovieVideo = async () => {
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

      dispatch(addTrailerVideo(trailer || null));
    } catch (err) {
      console.error("Error fetching movie trailer:", err);
    }
  };

  useEffect(() => {
    if (movieId && !trailerVideo) {
      getMovieVideo();
    }
  }, []);
};

export default useMovieTrailer;
