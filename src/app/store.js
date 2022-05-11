 import { configureStore } from '@reduxjs/toolkit'
 import categoryReducer from '../features/categorySlice'
 import productReducer from '../features/productSlice'
 import cartReducer from '../features/cartSlice'
 import userReducer from '../features/userSlice'
 import themeReducer from '../features/themeSlice'
 import checkoutReducer from '../features/checkoutSlice'
 
 export default configureStore({

    reducer:{
        category: categoryReducer,
        products: productReducer,
        cart: cartReducer,
        user: userReducer,
        theme: themeReducer,
        checkout: checkoutReducer
    },
 })