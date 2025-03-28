import { Movie } from '../types/movie';
import { Link } from 'wouter';
import { Card, Rate, Tag } from 'antd';

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <Link href={`/movie/${movie.id}`}>
            <Card
                hoverable
                cover={
                    <div className="relative aspect-[2/3]">
                        <img
                            src={movie.medium_cover_image}
                            alt={movie.title}
                            loading="lazy"
                            className="h-full w-full object-cover"
                        />
                    </div>
                }
            >
                <Card.Meta
                    title={movie.title}
                    description={
                        <div className="space-y-2">
                            <div className="text-sm flex items-center justify-between text-gray-600">
                                <span>{movie.year}</span>
                                <Rate
                                    disabled
                                    defaultValue={movie.rating / 2}
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.slice(0, 3).map((genre) => (
                                    <Tag key={genre} color="blue">
                                        {genre}
                                    </Tag>
                                ))}
                            </div>
                        </div>
                    }
                />
            </Card>
        </Link>
    );
};
