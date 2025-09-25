import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground"; 
import VideoTitle from "./Videotitle"; 
import { useEffect, useState } from "react";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const [mainMovie, setMainMovie] = useState(null);

  useEffect(() => {
    if (movies && movies.length > 0 && !mainMovie) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setMainMovie(movies[randomIndex]);
    }
  }, [movies, mainMovie]);

  if (!mainMovie) return null;

  return (
    <div className="relative w-full pt-26 sm:h-[70vh] md:pt-0 md:h-[85vh] lg:h-screen bg-gradient-to-r from-black/70 to-transparent">
       
      <VideoTitle movie={mainMovie} />
      <VideoBackground movieId={mainMovie.id} />
    </div>
  );
};

export default MainContainer;
