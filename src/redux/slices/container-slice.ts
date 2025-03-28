import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    private_routes: [],
};

const containerSlice = createSlice({
    name: 'container_store',
    initialState,
    reducers: {
        AddRouteToPrivateRoute: (state, { payload }) => {
            state.private_routes.push(payload.path);
        },
    },
});

export const { AddRouteToPrivateRoute } = containerSlice.actions;

export default containerSlice.reducer;
