import { createSlice } from '@reduxjs/toolkit'

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        selectedCategory: ''
    },
    reducers: {
        handleCategory: (state, action) => {
            state.selectedCategory = action.payload;
        }
    },
});

export const { handleCategory } = categorySlice.actions;
export const selectCategoryOpen = (state) => state.category.selectedCategory;

export default categorySlice.reducer;