import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRated from "../hooks/useTopRated";
import useTopSeries from "../hooks/useTopSeries";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcoming from "../hooks/useUpcoming";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SuggestionContainer from "./SuggestionContainer";
import GptSearch from "./GptSearch";
import ShowClipModal from "./showClipModal";  

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const { movie, videos, isClipOpen } = useSelector((store) => store.clip); // get modal state

  useNowPlayingMovies();
  usePopularMovies();
  useTopRated();
  useUpcoming();
  useTrendingMovies();
  useTopSeries();

  return (
    <div className="scrollbar-hide">
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SuggestionContainer />
        </>
      )}

      {/* ShowClipModal rendered on Browse page */}
      {isClipOpen && <ShowClipModal movie={movie} videos={videos} />}
    </div>
  );
};

export default Browse;
