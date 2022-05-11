import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name:'theme',
    initialState: "light",
    reducers:{
        changeTheme: (state, action) => {
            state = (state === "light" ? "dark" : "light")

            return state
        }
    }
})

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;