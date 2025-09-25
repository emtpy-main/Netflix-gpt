// movieSlice.js
import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    selectedMovie: null,
    movieVideos: [],
    isClipOpen: false,
  },
  reducers: {
    openClip: (state, action) => {
      state.selectedMovie = action.payload.movie;
      state.movieVideos = action.payload.videos;
      state.isClipOpen = true;
    },
    closeClip: (state) => {
      state.selectedMovie = null;
      state.movieVideos = [];
      state.isClipOpen = false;
    },
  },
});

export const { openClip, closeClip } = movieSlice.actions;
export default movieSlice.reducer;
