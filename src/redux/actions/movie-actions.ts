import { createAsyncThunk } from '@reduxjs/toolkit';
import { getApi } from '../../services/api-services';
import { MoviesResponse, MovieDetailResponse } from '../../types/movie';

interface MovieQueryParams {
    limit?: number;
    page?: number;
    quality?: string;
    genre?: string;
    minimum_rating?: number;
    query_term?: string;
    sort_by?: string;
    order_by?: string;
    with_rt_ratings?: boolean;
    cancelToken?: number;
}

export const fetchMovies = createAsyncThunk<MoviesResponse, MovieQueryParams>(
    'moviesSlice/fetchMovies',
    async (params, { rejectWithValue }) => {
        try {
            const queryParams = new URLSearchParams({
                limit: params.limit?.toString() || '20',
                page: params.page?.toString() || '1',
                quality: params.quality || 'all',
                genre: params.genre || 'all',
                minimum_rating: params.minimum_rating?.toString() || '0',
                query_term: params.query_term || '',
                sort_by: params.sort_by || 'date_added',
                order_by: params.order_by || 'desc',
                with_rt_ratings: params.with_rt_ratings?.toString() || 'false',
            });

            const response = await getApi(
                `/list_movies.json?${queryParams}`,
                {},
                params.cancelToken
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Failed to fetch movies'
            );
        }
    }
);

export const fetchMovieDetail = createAsyncThunk<MovieDetailResponse, string>(
    'moviesSlice/fetchMovieDetail',
    async (movieId, { rejectWithValue }) => {
        try {
            const response = await getApi(
                `/movie_details.json?movie_id=${movieId}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Failed to fetch movie details'
            );
        }
    }
);
