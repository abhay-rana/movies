import { useState, useEffect } from 'react';
import { MovieCard } from '../components/MovieCard';
import { NoMovies } from '../components/NoMovies';

import { useLocation } from 'wouter';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchMovies } from '~/redux/actions/movie-actions';
import {
    Input,
    Select,
    Form,
    Row,
    Col,
    Card,
    Pagination,
    Spin,
    Alert,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useAppDispatch } from '~/hooks/redux-hooks';
import { useLoader } from '~/hooks/useLoader';
import { getQueryParams } from '~/utils/getQueryParams';
import { GENRES, SORT_OPTIONS } from '~/constants/movie-filters-consants';

const { Search } = Input;
const { Option } = Select;

const MoviesListingScreen = () => {
    const [_, setLocation] = useLocation();
    const {
        genre = 'all',
        sort = 'date_added',
        page = 1,
        search = '',
        rating = 0,
    } = getQueryParams();

    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [loading, startLoader, endLoader] = useLoader(false);
    const { movies, error, totalPages } = useSelector(
        (state: RootState) => state.movies_store
    );
    const [currentPage, setCurrentPage] = useState(page || 1);
    const [searchTerm, setSearchTerm] = useState(search || '');
    const [selectedGenre, setSelectedGenre] = useState(genre || 'all');
    const [sortBy, setSortBy] = useState(sort || 'date_added');
    const [minimumRating, setMinimumRating] = useState(rating || 0);

    useEffect(() => {
        startLoader();
        dispatch(
            fetchMovies({
                page: currentPage,
                query_term: searchTerm,
                genre: selectedGenre,
                sort_by: sortBy,
                minimum_rating: minimumRating,
            })
        ).then(() => endLoader());
    }, [currentPage, searchTerm, selectedGenre, sortBy, minimumRating]);

    const handleFilterChange = (type: string, value: string | number) => {
        switch (type) {
            case 'genre':
                setSelectedGenre(value as string);
                break;
            case 'sort':
                setSortBy(value as string);
                break;
            case 'rating':
                setMinimumRating(value as number);
                break;
            case 'search':
                setSearchTerm(value);
                break;
            case 'page':
                setCurrentPage(value);
                break;
        }

        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set(type, value.toString());

        setLocation(`?${currentParams.toString()}`, {
            replace: true,
        });

        setCurrentPage(1);
    };

    function clearFilters() {
        setSearchTerm('');
        setSelectedGenre('all');
        setSortBy('date_added');
        setMinimumRating(0);
        setLocation('/listing', { replace: true });
        setCurrentPage(1);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="mb-8">
                <Form form={form} layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={8}>
                            <Form.Item label="Search Movies">
                                <Search
                                    placeholder="Search movies..."
                                    allowClear
                                    enterButton={<SearchOutlined />}
                                    size="large"
                                    value={searchTerm}
                                    onChange={(event) =>
                                        handleFilterChange(
                                            'search',
                                            event.target.value
                                        )
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8} md={6}>
                            <Form.Item label="Genre">
                                <Select
                                    value={selectedGenre}
                                    onChange={(value) =>
                                        handleFilterChange('genre', value)
                                    }
                                    size="large"
                                >
                                    <Option value="all">All Genres</Option>
                                    {GENRES.map((genre) => (
                                        <Option key={genre} value={genre}>
                                            {genre}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8} md={5}>
                            <Form.Item label="Sort By">
                                <Select
                                    value={sortBy}
                                    onChange={(value) =>
                                        handleFilterChange('sort', value)
                                    }
                                    size="large"
                                >
                                    {SORT_OPTIONS.map((option) => (
                                        <Option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8} md={5}>
                            <Form.Item label="Minimum Rating">
                                <Select
                                    value={minimumRating}
                                    onChange={(value) =>
                                        handleFilterChange('rating', value)
                                    }
                                    size="large"
                                >
                                    <Option value={0}>Any Rating</Option>
                                    <Option value={7}>7+ Rating</Option>
                                    <Option value={8}>8+ Rating</Option>
                                    <Option value={9}>9+ Rating</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>

            {error && (
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                    className="mb-4"
                />
            )}

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <Spin size="large" />
                </div>
            ) : movies?.length === 0 ? (
                <NoMovies {...{ clearFilters }} />
            ) : (
                <>
                    <Row gutter={[16, 16]}>
                        {movies?.map((movie) => (
                            <Col
                                xs={24}
                                sm={12}
                                md={8}
                                lg={6}
                                xl={4}
                                key={movie.id}
                            >
                                <MovieCard movie={movie} />
                            </Col>
                        ))}
                    </Row>

                    {totalPages > 1 && (
                        <div className="mt-8 flex justify-center">
                            <Pagination
                                current={currentPage}
                                total={totalPages}
                                onChange={(value) =>
                                    handleFilterChange('page', value)
                                }
                                showSizeChanger={false}
                                showQuickJumper
                                showTotal={(total) => `Total ${total} pages`}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
export default MoviesListingScreen;
