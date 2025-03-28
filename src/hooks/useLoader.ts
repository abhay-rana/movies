import { useState } from 'react';
// import React from 'react';

export const useLoader = (initial_state: boolean) => {
    const [loader, setLoader] = useState(initial_state);

    const startLoader = () => setLoader(true);
    const endLoader = () => setLoader(false);

    return [loader, startLoader, endLoader];
};

// Example usage of useLoader hook in a sample component

// const SampleComponent = () => {
//     const [loader, startLoader, endLoader] = useLoader(false);

//     const handleClick = () => {
//         startLoader();
//         // Simulate an async operation
//         setTimeout(() => {
//             endLoader();
//         }, 2000);
//     };

//     return (
//         <div>
//             <button onClick={handleClick}>Load Data</button>
//             {loader && <p>Loading...</p>}
//         </div>
//     );
// };

// export default SampleComponent;
