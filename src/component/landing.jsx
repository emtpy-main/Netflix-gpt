import { motion } from "framer-motion";
import {
  FaPlayCircle,
  FaLanguage,
  FaFilm,
  FaMagic,
  FaVideo,
} from "react-icons/fa";
import usePopularMovies from "../hooks/usePopularMovies";
import { Bg_url } from "../utils/constants";
import HoverExpand from "./ui/hover_card";
import image from "../assets/image.png";
import { useSelector } from "react-redux";
import { image_cdn } from "../utils/constants";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "./ui/scroll_velocity";
import { ImageCursorTrail } from "./ui/imageMouseTail";
import { Hover_images } from "../utils/hoverCardImage";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
const Landing = () => {
  usePopularMovies();
  const navigate = useNavigate();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  const images =
    popularMovies?.map((movie) => image_cdn + movie.poster_path) || [];
  const handleClick = ()=>{
    navigate("/login");
  }

  return (
    <div className="bg-black text-white min-h-screen w-full"> 
      <Header/>
      <section
        className="relative h-screen flex flex-col items-center justify-center text-center px-6 bg-cover bg-center"
        style={{ backgroundImage: `url(${Bg_url})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
            Discover Movies Like Never Before 🎬
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            AI-powered recommendations, trailers, and behind-the-scenes — all in
            one place.
          </p>
          <div className="flex space-x-4 justify-center">
            <button className="bg-red-600 px-6 py-3 rounded-xl text-lg font-bold hover:bg-red-700 transition cursor-pointer"
              onClick={handleClick}
            >
              Get Started
            </button>
            <button className="border border-gray-400 px-6 py-3 rounded-xl text-lg font-bold hover:bg-gray-800 transition cursor-pointer"
              onClick={handleClick}
            >
              Explore Now
            </button>
          </div>
        </motion.div>
      </section>

      {/* Popular Movies */}
      <section className="px-8 py-12">
        <h2 className="text-3xl font-bold mb-6">Popular Now</h2>
        <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-800 pb-4">
          <HoverExpand
            images={images}
            initialSelectedIndex={0}
            thumbnailHeight={300}
            modalImageSize={400}
            maxThumbnails={20}
          />
        </div>
      </section>

      {/* AI Recommendation Teaser */}
      <section className="px-8 py-12 grid md:grid-cols-2 gap-8 items-center bg-gray-900">
        <div>
          <h2 className="text-4xl font-bold mb-4">Not sure what to watch?</h2>
          <p className="text-gray-300 mb-6">
            Ask our AI and get personalized movie recommendations instantly.
          </p>
          <button className="bg-red-600 px-6 py-3 rounded-xl text-lg font-bold hover:bg-red-700 transition cursor-pointer"
            onClick={handleClick}
          >
            Try AI Recommender
          </button>
        </div>
        <img src={image} alt="" />
      </section>

      {/* Trailers & Clips */}
      <section className="px-8 py-12">
        <ScrollVelocityContainer className="text-4xl md:text-7xl font-bold">
          <ScrollVelocityRow baseVelocity={10} direction={1}>
            Watch Trailers, <span className="text-red-800">Teasers</span> &
            Behind-<span className="text-red-800">The</span>-Scenes
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={10} direction={-1}>
            Watch <span className="text-red-800">Trailers</span>, Teasers &
            Behind-<span className="text-red-800">The</span>-Scenes
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </section>

      {/* Multi-Language */}
      <section className="px-8 py-12 bg-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Browse movies in your language
        </h2>
        <div className="flex justify-center space-x-6">
          <FaLanguage className="w-10 h-10 text-red-500" />
          <span>English | Hindi | Spanish | Urdu</span>
        </div>
      </section>
      {/* Closing CTA */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center text-center px-6   bg-cover bg-center overflow-visible"
        style={{ backgroundImage: `url(${Bg_url})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Cursor Trail sits above overlay but below text */}
        <ImageCursorTrail
          items={Hover_images}
          maxNumberOfImages={5}
          distance={25}
          imgClass="sm:w-40 w-28 sm:h-48 h-36"
          className="absolute inset-0 z-20"
        />

        {/* Content on top */}
        <div className="relative z-30 max-w-4xl mx-auto">
          <article className="flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to find your next favorite movie?
            </h2>

            <div className="flex space-x-4 justify-center">
              <button className="bg-red-600 px-6 py-3 rounded-xl text-lg font-bold hover:bg-red-700 transition cursor-pointer"
                onClick={handleClick}
              >
                Login with Google
              </button>
              <button className="border border-gray-400 px-6 py-3 rounded-xl text-lg font-bold hover:bg-gray-800 transition cursor-pointer"
                onClick={handleClick}
              >
                Start Browsing
              </button>
            </div>
          </article>
        </div>
      </section>
      {/* Why Choose */}
      <section className="px-8 py-12">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Why Choose NetflixGPT?
        </h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="p-6 bg-gray-800 rounded-xl">
            <FaFilm className="mx-auto mb-4 w-10 h-10 text-red-500" />
            <p>All-in-one platform</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl">
            <FaMagic className="mx-auto mb-4 w-10 h-10 text-red-500" />
            <p>AI-powered suggestions</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl">
            <FaVideo className="mx-auto mb-4 w-10 h-10 text-red-500" />
            <p>Trailers & behind-the-scenes</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl">
            <FaLanguage className="mx-auto mb-4 w-10 h-10 text-red-500" />
            <p>Multi-language support</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
