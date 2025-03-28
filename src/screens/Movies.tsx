import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'wouter';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchMovies } from '../redux/actions/movie-actions';
import {
    selectMovies,
    selectLoading,
    selectError,
    selectCurrentPage,
    selectTotalPages,
    selectTotalMovies,
} from '../redux/slices/movieSlice';
import {
    Card,
    Row,
    Col,
    Rate,
    Tag,
    Spin,
    Alert,
    Select,
    Input,
    Space,
    Button,
    Typography,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { MovieCard } from '../components/MovieCard';
import { NoMovies } from '../components/NoMovies';
import { Movie } from '../types/movie';
import debounce from 'lodash/debounce';

const { Search } = Input;
const { Title } = Typography;

const GENRES = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Mystery',
    'Romance',
    'Science Fiction',
    'TV Movie',
    'Thriller',
    'War',
    'Western',
];

const SORT_OPTIONS = [
    { value: 'title', label: 'Title' },
    { value: 'year', label: 'Year' },
    { value: 'rating', label: 'Rating' },
    { value: 'date_added', label: 'Date Added' },
];

export const Movies = () => {
    const [_, setLocation] = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const movies = useSelector(selectMovies);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const currentPage = useSelector(selectCurrentPage);
    const totalPages = useSelector(selectTotalPages);
    const totalMovies = useSelector(selectTotalMovies);

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('title');
    const [minRating, setMinRating] = useState(0);
    const [page, setPage] = useState(1);

    // Function to update URL with current filters
    const updateURL = useCallback(
        (newFilters: {
            search?: string;
            genres?: string[];
            sort?: string;
            rating?: number;
            page?: number;
        }) => {
            const params = new URLSearchParams();
            if (newFilters.search)
                params.set('search', encodeURIComponent(newFilters.search));
            if (newFilters.genres?.length)
                params.set(
                    'genres',
                    newFilters.genres
                        .map((g) => encodeURIComponent(g))
                        .join(',')
                );
            if (newFilters.sort)
                params.set('sort', encodeURIComponent(newFilters.sort));
            if (newFilters.rating)
                params.set('rating', newFilters.rating.toString());
            if (newFilters.page) params.set('page', newFilters.page.toString());

            const newPath = params.toString()
                ? `/movies?${params.toString()}`
                : '/movies';
            setLocation(newPath);
        },
        [setLocation]
    );

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setSearchQuery(value);
            setPage(1);
        }, 500),
        []
    );

    // Function to fetch movies with current filters
    const fetchMoviesWithFilters = useCallback(() => {
        dispatch(
            fetchMovies({
                page,
                query_term: searchQuery,
                genre: selectedGenres.join(','),
                sort_by: sortBy,
                minimum_rating: minRating,
            })
        );
    }, [dispatch, page, searchQuery, selectedGenres, sortBy, minRating]);

    // Effect to handle URL parameters on mount and URL changes
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        // Hydrate state from URL parameters
        const search = decodeURIComponent(params.get('search') || '');
        const genres = (params.get('genres')?.split(',') || []).map((g) =>
            decodeURIComponent(g)
        );
        const sort = decodeURIComponent(params.get('sort') || 'title');
        const rating = Number(params.get('rating')) || 0;
        const pageNum = Number(params.get('page')) || 1;

        setSearchQuery(search);
        setSelectedGenres(genres);
        setSortBy(sort);
        setMinRating(rating);
        setPage(pageNum);

        // Fetch movies with URL parameters
        dispatch(
            fetchMovies({
                page: pageNum,
                query_term: search,
                genre: genres.join(','),
                sort_by: sort,
                minimum_rating: rating,
            })
        );
    }, [dispatch]);

    // Effect to update URL when filters change
    useEffect(() => {
        updateURL({
            search: searchQuery,
            genres: selectedGenres,
            sort: sortBy,
            rating: minRating,
            page,
        });
    }, [searchQuery, selectedGenres, sortBy, minRating, page, updateURL]);

    // Effect to fetch movies when filters change
    useEffect(() => {
        fetchMoviesWithFilters();
    }, [fetchMoviesWithFilters]);

    // Handler for filter changes
    const handleFilterChange = (
        type: 'search' | 'genres' | 'sort' | 'rating' | 'page',
        value: string | string[] | number
    ) => {
        switch (type) {
            case 'search':
                debouncedSearch(value as string);
                break;
            case 'genres':
                setSelectedGenres(value as string[]);
                setPage(1);
                break;
            case 'sort':
                setSortBy(value as string);
                setPage(1);
                break;
            case 'rating':
                setMinRating(value as number);
                setPage(1);
                break;
            case 'page':
                setPage(value as number);
                break;
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <Title level={1} className="mb-8">
                    Movies ({totalMovies})
                </Title>

                {/* Filters */}
                <Card className="mb-8">
                    <Space direction="vertical" size="large" className="w-full">
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={8}>
                                <Search
                                    placeholder="Search movies..."
                                    allowClear
                                    enterButton={<SearchOutlined />}
                                    value={searchQuery}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'search',
                                            e.target.value
                                        )
                                    }
                                    onSearch={(value) =>
                                        handleFilterChange('search', value)
                                    }
                                />
                            </Col>
                            <Col xs={24} md={8}>
                                <Select
                                    mode="multiple"
                                    placeholder="Select genres"
                                    className="w-full"
                                    value={selectedGenres}
                                    onChange={(value) =>
                                        handleFilterChange('genres', value)
                                    }
                                    options={GENRES.map((genre) => ({
                                        label: genre,
                                        value: genre,
                                    }))}
                                />
                            </Col>
                            <Col xs={24} md={8}>
                                <Select
                                    placeholder="Sort by"
                                    className="w-full"
                                    value={sortBy}
                                    onChange={(value) =>
                                        handleFilterChange('sort', value)
                                    }
                                    options={SORT_OPTIONS}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Space>
                                    <span>Minimum Rating:</span>
                                    <Rate
                                        allowHalf
                                        value={minRating}
                                        onChange={(value) =>
                                            handleFilterChange('rating', value)
                                        }
                                    />
                                    <span>{minRating}/5</span>
                                </Space>
                            </Col>
                        </Row>
                    </Space>
                </Card>

                {/* Movie Grid */}
                {movies.length === 0 ? (
                    <NoMovies
                        clearFilters={() => {
                            setSearchQuery('');
                            setSelectedGenres([]);
                            setSortBy('title');
                            setMinRating(0);
                            setPage(1);
                        }}
                    />
                ) : (
                    <Row gutter={[24, 24]}>
                        {movies.map((movie: Movie) => (
                            <Col key={movie.id} xs={24} sm={12} md={8} lg={6}>
                                <MovieCard movie={movie} />
                            </Col>
                        ))}
                    </Row>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                        <Space>
                            <Button
                                disabled={page === 1}
                                onClick={() =>
                                    handleFilterChange('page', page - 1)
                                }
                            >
                                Previous
                            </Button>
                            <span>
                                Page {page} of {totalPages}
                            </span>
                            <Button
                                disabled={page === totalPages}
                                onClick={() =>
                                    handleFilterChange('page', page + 1)
                                }
                            >
                                Next
                            </Button>
                        </Space>
                    </div>
                )}
            </div>
        </div>
    );
};
