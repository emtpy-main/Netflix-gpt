import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";  
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";
import clipReducer from "./clipSlice"

const appStore = configureStore({
  reducer: {
    user: userReducer,    
    movies : moviesReducer,
    gpt : gptReducer,
    config : configReducer,
    clip : clipReducer,
  },
});

export default appStore;
