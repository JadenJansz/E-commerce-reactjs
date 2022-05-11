import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
    name:'checkout',
    initialState: [],
    reducers: {
        fetchDetails: (state, action) => {
            state.push(action.payload);
        }
    }
});

export const { fetchDetails } = checkoutSlice.actions;


export default checkoutSlice.reducer;