import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import { getGroqResponse } from "../utils/openAi";
import { Api_options } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchtext = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        movie
      )}&include_adult=false&language=en-US&page=1`,
      Api_options
    );

    const json = await response.json();
    return json.results;
  };

  const handleShowGptresults = async () => {
    const gptQuery =
      "You are a movie recommendation system. " +
      "Based on the user query: " +
      searchtext.current.value +
      ". Suggest exactly 10 movies. " +
      "Output rules: " +
      "1. Only plain movie names (no special characters, no numbers, no extra text, no punctuation like !, :, -, ?, etc.). " +
      "2. Return names in English only. " +
      "3. Separate each movie by a comma with no spaces before or after. " +
      "4. Do not include any introduction or explanation. " +
      "Example: sultan,krish,avenger,fast and furious,boothnath,eternals,dune,jumper,golmal,badshah";

    try {
      const res = await getGroqResponse(gptQuery);
      const movies = res.split(",").map((m) => m.trim());

      const tmdbsearch = movies.map((movie) => searchMovieTMDB(movie));

      const resolved = await Promise.all(tmdbsearch);
      dispatch(addGptMovieResults({ movieName: movies, movieResults: resolved }));
    } catch (err) {
      console.error("Error fetching GPT results:", err);
    }
  };

  return (
    <div className="w-full mt-50 md:mt-40 px-4">
      <form
        className="flex  sm:flex-row w-full sm:w-4/5 lg:w-1/2 max-w-3xl mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchtext}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceHolder}
          className="flex-grow p-3 sm:p-4 text-base sm:text-lg rounded-t-md sm:rounded-l-md sm:rounded-t-none outline-none 
                     bg-gray-800 text-white placeholder-gray-400"
        />
        <button
          type="submit"
          className="px-4 sm:px-6 py-2 sm:py-0 bg-red-600 text-white font-semibold text-base sm:text-xl
                     rounded-b-md sm:rounded-r-md sm:rounded-b-none hover:bg-red-700 transition duration-300"
          onClick={handleShowGptresults}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
