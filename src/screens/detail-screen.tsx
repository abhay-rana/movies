import React, { useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchMovieDetail } from '../redux/actions/movie-actions';
import {
    selectSelectedMovie,
    selectLoading,
    selectError,
} from '../redux/slices/movieSlice';
import {
    Card,
    Row,
    Col,
    Rate,
    Tag,
    Spin,
    Alert,
    Button,
    Image,
    Typography,
    Space,
} from 'antd';
import { DownloadOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useAppDispatch } from '~/hooks/redux-hooks';
import { useLoader } from '~/hooks/useLoader';

const { Title, Paragraph, Text } = Typography;

const DetailScreen = () => {
    const [match, params] = useRoute('/movie/:id');
    const [loader, startLoader, endLoader] = useLoader(true);
    const dispatch = useAppDispatch();
    const movie = useSelector(selectSelectedMovie);
    // const loading = useSelector(selectLoading);
    // const error = useSelector(selectError);

    useEffect(() => {
        startLoader();
        const movieId = params?.id;
        if (movieId) {
            dispatch(fetchMovieDetail(movieId))
                .unwrap()
                .then(() => endLoader());
        }
    }, [params?.id]);

    if (loader) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    // if (error) {
    //     return (
    //         <div className="container mx-auto px-4 py-8">
    //             <Alert
    //                 message="Error"
    //                 description={error}
    //                 type="error"
    //                 showIcon
    //             />
    //         </div>
    //     );
    // }

    if (!movie) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Alert message="Movie not found" type="warning" showIcon />
            </div>
        );
    }

    console.log({ movie });

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <div
                className="relative h-[60vh] bg-cover bg-center"
                style={{ backgroundImage: `url(${movie.background_image})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="container relative mx-auto flex h-full items-center px-4">
                    <Row gutter={[24, 24]} className="w-full">
                        <Col xs={24} md={8}>
                            <Image
                                src={movie.large_cover_image}
                                alt={movie.title}
                                className="rounded-lg shadow-xl"
                            />
                        </Col>
                        <Col
                            xs={24}
                            md={16}
                            className="flex flex-col justify-center text-white"
                        >
                            <Title level={1} className="!text-white">
                                {movie.title_long}
                            </Title>
                            <Space size={16} className="mb-4">
                                <Rate
                                    disabled
                                    defaultValue={movie.rating / 2}
                                />
                                <Text className="text-white">
                                    {movie.rating}/10
                                </Text>
                                <Text className="text-white">
                                    {movie.runtime} min
                                </Text>
                                <Text className="text-white">{movie.year}</Text>
                            </Space>
                            <Space wrap className="mb-4">
                                {movie.genres.map((genre) => (
                                    <Tag key={genre} color="blue">
                                        {genre}
                                    </Tag>
                                ))}
                            </Space>
                            <Space className="mb-4">
                                <Button
                                    type="primary"
                                    icon={<PlayCircleOutlined />}
                                    size="large"
                                >
                                    Watch Trailer
                                </Button>
                                <Button
                                    type="primary"
                                    icon={<DownloadOutlined />}
                                    size="large"
                                >
                                    Download
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-8">
                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={16}>
                        <Card title="About" className="mb-6">
                            <Paragraph>
                                {movie.description_full ||
                                    'No description available.'}
                            </Paragraph>
                        </Card>

                        <Card title="Screenshots" className="mb-6">
                            <Row gutter={[16, 16]}>
                                {movie.medium_screenshot_image1 && (
                                    <Col xs={24} sm={8}>
                                        <Image
                                            src={movie.medium_screenshot_image1}
                                            alt="Screenshot 1"
                                            className="rounded-lg"
                                        />
                                    </Col>
                                )}
                                {movie.medium_screenshot_image2 && (
                                    <Col xs={24} sm={8}>
                                        <Image
                                            src={movie.medium_screenshot_image2}
                                            alt="Screenshot 2"
                                            className="rounded-lg"
                                        />
                                    </Col>
                                )}
                                {movie.medium_screenshot_image3 && (
                                    <Col xs={24} sm={8}>
                                        <Image
                                            src={movie.medium_screenshot_image3}
                                            alt="Screenshot 3"
                                            className="rounded-lg"
                                        />
                                    </Col>
                                )}
                            </Row>
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Card title="Download Options" className="mb-6">
                            <Space direction="vertical" className="w-full">
                                {movie.torrents.map((torrent) => (
                                    <Button
                                        key={torrent.hash}
                                        type="primary"
                                        icon={<DownloadOutlined />}
                                        block
                                        href={torrent.url}
                                        target="_blank"
                                    >
                                        {torrent.quality} ({torrent.size})
                                    </Button>
                                ))}
                            </Space>
                        </Card>

                        <Card title="Movie Info">
                            <Space direction="vertical" className="w-full">
                                <div>
                                    <Text strong>Language:</Text>{' '}
                                    {movie.language}
                                </div>
                                <div>
                                    <Text strong>MPA Rating:</Text>{' '}
                                    {movie.mpa_rating || 'Not Rated'}
                                </div>
                                <div>
                                    <Text strong>Uploaded:</Text>{' '}
                                    {new Date(
                                        movie.date_uploaded
                                    ).toLocaleDateString()}
                                </div>
                                <div>
                                    <Text strong>IMDB Code:</Text>{' '}
                                    <a
                                        href={`https://www.imdb.com/title/${movie.imdb_code}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {movie.imdb_code}
                                    </a>
                                </div>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default DetailScreen;
