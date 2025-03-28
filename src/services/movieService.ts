import { MoviesResponse } from '../types/movie';

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const BASE_URL = 'https://movie-database-api1.p.rapidapi.com';

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
}

export const movieService = {
    async getMovies(params: MovieQueryParams = {}): Promise<MoviesResponse> {
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

        const response = await fetch(
            `${BASE_URL}/list_movies.json?${queryParams}`,
            {
                headers: {
                    'X-RapidAPI-Key': API_KEY,
                    'X-RapidAPI-Host': 'movie-database-api1.p.rapidapi.com',
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }

        return response.json();
    },
};
