import { Api_options } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUpcoming } from "../utils/moviesSlice";
import { useEffect } from "react";

const useUpcoming = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  const getUpcoming = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/upcoming?page=2", Api_options);
    const json = await data.json();
    dispatch(addUpcoming(json.results));
  };

  useEffect(() => {
    if (!upcomingMovies || upcomingMovies.length === 0) {
      getUpcoming();
    }
  }, []);
};

export default useUpcoming;
