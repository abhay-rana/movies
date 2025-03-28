import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import { APP_MODE } from '~/env';
import movieSlice from '~/redux/slices/movieSlice';
import countSlice from '~/redux/slices/count-slice';
import containerSlice from '~/redux/slices/container-slice';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [''],
};

const reducers = combineReducers({
    counter_store: countSlice,
    container_store: containerSlice,
    movies_store: movieSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: APP_MODE === 'development',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            serializableCheck: false,
            immutableCheck: false,
        }),
});

export const persistor = persistStore(store);

//This line is for typescirpt (Javascript does't have them)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
