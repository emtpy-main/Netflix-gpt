import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice(
    {
        name : "movies",
        initialState : {
            nowPlayingMovies : null,
            topRated : null,
            popularMovies : null,
            trailerVideo : null,
            upcoming : null,
            trending:null,
            topSeries:null,
        },
        reducers : {
            addNowPlayingMovies : (state,action) => {
                state.nowPlayingMovies = action.payload;
            },
            addTrailerVideo : (state, action) => {
                 state.trailerVideo = action.payload;
            },
            addPopularMovies : (state,action) =>{
                state.popularMovies = action.payload;
            },
            addTopRated : (state,action)=>{
                state.topRated = action.payload;
            },
            addUpcoming : (state,action)=>{
                state.upcoming = action.payload;
            },
            addTrending : (state,action)=>{
                state.trending = action.payload;
            },
            addTopSeries : (state,action)=>{
                state.topSeries = action.payload;
            }
        }
    }
)

export const {addNowPlayingMovies,
                addTrailerVideo,
                addPopularMovies,
                addTopRated,
                addUpcoming,
                addTopSeries,
                addTrending } = moviesSlice.actions;

export default moviesSlice.reducer;