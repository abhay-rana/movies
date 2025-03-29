import { Button, Result, Space } from 'antd';
import React from 'react';
import { Link } from 'wouter';
import { HomeOutlined, SearchOutlined } from '@ant-design/icons';

const RouteNotFound: React.FC = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Space size="middle">
                        <Link href="/">
                            <Button type="primary" icon={<HomeOutlined />}>
                                Back to Home
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button icon={<SearchOutlined />}>
                                Browse Movies
                            </Button>
                        </Link>
                    </Space>
                }
                className="rounded-lg bg-white p-8 shadow-md"
            />
        </div>
    );
};

export default RouteNotFound;
