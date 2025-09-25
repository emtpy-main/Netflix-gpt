import { Api_options } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTopRated } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTopRated = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  const getTopRated = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      Api_options
    );
    const json = await data.json();
    dispatch(addTopRated(json.results));
  };

  useEffect(() => {
    if (!topRatedMovies || topRatedMovies.length === 0) {
      getTopRated();
    }
  }, []);
};

export default useTopRated;
