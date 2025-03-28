import {
    useDispatch,
    useSelector,
    TypedUseSelectorHook,
    shallowEqual,
} from 'react-redux';

import type { RootState, AppDispatch } from '~/redux/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
// Define your custom selector hook with shallow equality
export const useAppSelector: TypedUseSelectorHook<RootState> = (selector) => {
    return useSelector((state: RootState) => selector(state), shallowEqual);
};
