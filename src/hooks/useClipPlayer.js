import { useDispatch } from "react-redux";
import { openClip } from "../utils/clipSlice";
import { Api_options } from "../utils/constants";

const useClipPlayer = () => {
  const dispatch = useDispatch();

  const handleClip = async (movie, id) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        Api_options
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const results = data.results;

      // send movie + videos to modal
      dispatch(openClip({ movie, videos: results }));
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  return handleClip;
};

export default useClipPlayer;
