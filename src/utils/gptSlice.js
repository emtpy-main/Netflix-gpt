import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice(
    {
        name : "gpt",
        initialState : {
            showGptSearch:false,
            movieName : null,
            movieResults : null,
            trailerVideo:null,
        },
        reducers : {
            toggleGptSearch : (state,action)=>{
                state.showGptSearch = !state.showGptSearch;
            },
            addGptMovieResults : (state,action)=>{
                const {movieName,movieResults} = action.payload;
                state.movieName = movieName;
                state.movieResults = movieResults;
            },
            addTrailerVideo : (state,action)=>{
                state.trailerVideo = action.payload;
            }
        }
    }
)

export const {toggleGptSearch,addGptMovieResults,addTrailerVideo} = gptSlice.actions;

export default gptSlice.reducer;