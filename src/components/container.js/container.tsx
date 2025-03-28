import React from 'react';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <div className="h-full w-full">{children}</div>
        </>
    );
};

export default Container;
