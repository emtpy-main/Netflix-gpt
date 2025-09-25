import { Api_options } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTopSeries } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTopSeries = () => {
  const dispatch = useDispatch();
  const topSeries = useSelector((store) => store.movies.topSeries);

  const getTopSeries = async () => {
    const data = await fetch("https://api.themoviedb.org/3/tv/top_rated", Api_options);
    const json = await data.json();
    dispatch(addTopSeries(json.results));
  };

  useEffect(() => {
    if (!topSeries || topSeries.length === 0) {
      getTopSeries();
    }
  }, []);
};

export default useTopSeries;
