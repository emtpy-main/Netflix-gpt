import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { avatar } from "../utils/constants";
import { toggleGptSearch } from "../utils/gptSlice";
import { supportedLanguages } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";
import TextToSvgComponent from "./ui/TextToSvgComponent";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error("Sign out error:", error);
        navigate("/error");
      });
  };
  const moveToHome = ()=>{
    navigate('/');
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        if (window.location.pathname !== "/login") {
          navigate("/");
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptsearchClick = () => {
    dispatch(toggleGptSearch());
  };

  const handleChangeLanguage = (l) => {
    dispatch(changeLanguage(l));
  };

  return (
    <div
      className="
  absolute w-full px-4 md:px-[3rem] py-2
  bg-gradient-to-b from-black to-transparent
  z-10 flex flex-col md:flex-row items-center justify-between
"
    >
      <svg width="300" height="80" xmlns="http://www.w3.org/2000/svg">
        <text
          x="0"
          y="50"
          font-family="Montserrat, sans-serif"
          font-size="48"
          font-weight="600"
          fill="#bf0808"
          onClick={moveToHome}
        >
          Netflix-GPT
        </text>
      </svg>

      {user && (
        <div className="flex h-[60%] gap-2 md:gap-3 items-center mt-2 md:mt-0">
          {showGptSearch && (
            <select
              className="bg-black text-white outline-none p-1 rounded-md text-xs md:text-sm"
              onChange={(e) => handleChangeLanguage(e.target.value)}
            >
              {supportedLanguages.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          {/* GPT Search Button */}
          <button
            className="
              relative inline-flex items-center justify-center p-0.5 
              text-xs md:text-sm font-medium text-white rounded-lg group 
              bg-gradient-to-br from-red-500 to-pink-500 
              hover:from-red-700 hover:to-pink-800 
              cursor-pointer transition-all duration-300
            "
            onClick={handleGptsearchClick}
          >
            <span
              className="
                relative px-3 py-1 md:px-5 md:py-2.5 
                text-sm md:text-lg 
                transition-all ease-in duration-75 bg-transparent rounded-md
              "
            >
              {!showGptSearch ? "Gpt Search" : "Browse"}
            </span>
          </button>

          {/* Logout Button */}
          <button
            className="
              relative inline-flex items-center justify-center p-0.5 
              text-xs md:text-sm font-medium text-white rounded-lg group 
              bg-gradient-to-br from-red-500 to-pink-500 
              hover:from-red-700 hover:to-pink-800 
              cursor-pointer transition-all duration-300
            "
            onClick={handleSignOut}
          >
            <span
              className="
                relative px-3 py-1 md:px-5 md:py-2.5 
                text-sm md:text-lg 
                transition-all ease-in duration-75 bg-transparent rounded-md
              "
            >
              Log Out
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
