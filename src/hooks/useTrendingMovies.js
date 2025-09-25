import { Api_options } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrending } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTrendingMovies = () => {
  const dispatch = useDispatch();
  const trendingMovies = useSelector((store) => store.movies.trendingMovies);

  const getTrending = async () => {
    const data = await fetch("https://api.themoviedb.org/3/trending/movie/week", Api_options);
    const json = await data.json();
    dispatch(addTrending(json.results));
  };

  useEffect(() => {
    if (!trendingMovies || trendingMovies.length === 0) {
      getTrending();
    }
  }, []);
};

export default useTrendingMovies;
