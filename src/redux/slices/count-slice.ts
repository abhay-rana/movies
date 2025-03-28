import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Counter {
    counter: number;
    counter_two: number;
}

const initialState: Counter = {
    counter: 0,
    counter_two: 0,
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increaseCounter: (state) => {
            state.counter += 1;
        },
        counterTwo: (state) => {
            state.counter_two += 1;
        },
        increaseCounterBy: (state, action: PayloadAction<number>) => {
            state.counter += action.payload;
        },
    },
});

export const { increaseCounter, counterTwo, increaseCounterBy } =
    counterSlice.actions;

export default counterSlice.reducer;
