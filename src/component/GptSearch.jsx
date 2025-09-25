import GptSearchBar from "./GptSearchBar";
import GptSearchPage from "./GptSearchPage";
import { Bg_url } from "../utils/constants";

const GptSearch = () => {
  return (
    <div 
  className="w-full h-screen  fixed bg-cover bg-center" 
  style={{ backgroundImage: `url(${Bg_url})` }}
>
  
  <div className="h-full w-full mx-auto  overflow-y-auto bg-black/50 scrollbar-hide">
    <GptSearchBar/>
    <GptSearchPage/>
  </div>
</div>

  );
};

export default GptSearch;
