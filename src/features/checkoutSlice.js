import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
    name:'checkout',
    initialState: [],
    reducers: {
        fetchDetails: (state, action) => {
            state = action.payload

            return state;
        }
    }
});

export const { fetchDetails } = checkoutSlice.actions;


export default checkoutSlice.reducer;