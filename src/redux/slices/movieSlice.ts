import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MoviesResponse } from '../../types/movie';
import { fetchMovies, fetchMovieDetail } from '../actions/movie-actions';

interface MovieState {
    movies: Movie[];
    selectedMovie: Movie | null;
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    totalMovies: number;
    lastUpdated: number | null;
}

const initialState: MovieState = {
    movies: [],
    selectedMovie: null,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalMovies: 0,
    lastUpdated: null,
};

const movieSlice = createSlice({
    name: 'moviesSlice',
    initialState,
    reducers: {
        resetMovies: (state) => {
            state.movies = [];
            state.selectedMovie = null;
            state.loading = false;
            state.error = null;
            state.currentPage = 1;
            state.totalPages = 1;
            state.totalMovies = 0;
            state.lastUpdated = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle loading state
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Handle success state
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload.data.movies;
                state.totalMovies = action.payload.data.movie_count;
                state.totalPages = Math.ceil(
                    action.payload.data.movie_count / action.payload.data.limit
                );
                state.lastUpdated = Date.now();
                state.error = null;
            })
            // Handle error state
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch movies';
            })
            // Handle movie detail loading state
            .addCase(fetchMovieDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Handle movie detail success state
            .addCase(fetchMovieDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedMovie = action.payload.data.movie;
                state.error = null;
            })
            // Handle movie detail error state
            .addCase(fetchMovieDetail.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || 'Failed to fetch movie details';
            });
    },
});

// Export actions
export const { resetMovies, clearError } = movieSlice.actions;

// Export selectors
export const selectMovies = (state: { movies_store: MovieState }) =>
    state.movies_store.movies;
export const selectSelectedMovie = (state: { movies_store: MovieState }) =>
    state.movies_store.selectedMovie;
export const selectLoading = (state: { movies_store: MovieState }) =>
    state.movies_store.loading;
export const selectError = (state: { movies_store: MovieState }) =>
    state.movies_store.error;
export const selectCurrentPage = (state: { movies_store: MovieState }) =>
    state.movies_store.currentPage;
export const selectTotalPages = (state: { movies_store: MovieState }) =>
    state.movies_store.totalPages;
export const selectTotalMovies = (state: { movies_store: MovieState }) =>
    state.movies_store.totalMovies;
export const selectLastUpdated = (state: { movies_store: MovieState }) =>
    state.movies_store.lastUpdated;

export default movieSlice.reducer;
