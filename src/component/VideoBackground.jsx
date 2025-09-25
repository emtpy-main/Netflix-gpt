import useMovieTrailer from "../hooks/useMovieTrailer";
import {useSelector } from "react-redux"; 

const VideoBackground = ({ movieId  }) => {
  useMovieTrailer(movieId);
  const trailerKey = useSelector((store)=> store.movies?.trailerVideo)?.key;

  return ( 
   <div className="w-screen">
      {trailerKey ? (
         <iframe  
          className="w-screen aspect-video"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1`}
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
      ) : (
         <p className="text-white" >Loading trailer...</p>
      )}
    </div>

  );
};

export default VideoBackground;
 