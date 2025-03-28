import { Empty, Button } from 'antd';
import { useLocation } from 'wouter';
import { SearchOutlined } from '@ant-design/icons';

export const NoMovies = ({ clearFilters }) => {
    const [_, setLocation] = useLocation();

    return (
        <div className="flex h-[60vh] flex-col items-center justify-center">
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                    <div className="space-y-4">
                        <p className="text-lg text-gray-600">No movies found</p>
                        <p className="text-sm text-gray-500">
                            Try adjusting your search or filters to find what
                            you're looking for
                        </p>
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            onClick={clearFilters}
                            className="bg-blue-500 hover:bg-blue-600"
                        >
                            Clear Filters
                        </Button>
                    </div>
                }
            />
        </div>
    );
};
