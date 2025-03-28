import React from 'react';
import SpinnerSvg from './spinner.svg';

export interface IFullLoader {
    state: boolean;
}

const FullLoader: React.FC<IFullLoader> = ({ state }) => {
    if (!state) {
        return null;
    }
    return (
        <>
            <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-20">
                <SpinnerSvg className="fill-current text-white" />
            </div>
        </>
    );
};

export default FullLoader;
