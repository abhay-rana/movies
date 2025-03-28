import axios from 'axios';
import { useEffect } from 'react';

const useCancelToken = () => {
        //  creates a new CancelToken instance each time it’s called.
    const cancelTokenSource = axios.CancelToken.source();

    useEffect(() => {
        return () => {
            cancelTokenSource.cancel('Component unmounted');
        };
    }, []);

    const cancelRequest = () => {
        cancelTokenSource.cancel('Request canceled');
    };

    return { cancelToken: cancelTokenSource.token, cancelRequest };
};

export default useCancelToken;

//! example

// const YourComponent = () => {
//     const dispatch = useDispatch();
//     const { cancelToken, cancelRequest } = useCancelToken(); // Use the custom hook

//     useEffect(() => {
// Dispatch the action with cancelToken
//         dispatch(GetTodos({ cancelToken }));
// Cleanup function to cancel the request
//         return () => {
//             cancelRequest(); // Cancel the request when component unmounts
//         };
//     }, []);

//     return <>{/* Your component JSX */}</>;
// };

//! how to handle the race condition inside the useEffect
// useEffect(() => {
//     let ignore = true;
//     dispatch(GetTodos({ search }))
//         .unwrap()
//         .then((data) => {
//             console.log({ search, ignore });
//             if (ignore === true) {
//                 console.log({ data, search });
//             }
//         });
//     return () => {
//         ignore = false;
//     };
// }, [search]);
