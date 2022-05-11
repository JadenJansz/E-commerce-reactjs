import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        createCart: (state, action) => {
           const exist = state.find(x => x.item.id === action.payload.id)

           if(!exist){
               state.push({item:action.payload, qty: 1})
           }
           //console.log(action.payload)
            
        },
        increaseCart: (state, action) => {
            const exist = state.find(x => x.item.id === action.payload.id)

            if(exist){
                exist.qty = exist.qty + 1
            }
            //console.log('click')
        },
        decreaseCart: (state, action) => {
            const exist = state.find(x => x.item.id === action.payload.id)

            if(exist){

                exist.qty = exist.qty - 1
                if(exist.qty === 0){
                    state.splice(state.findIndex((x) => x.item.id === action.payload.id), 1) 
                    
                    return
                }
                
            }
        },
        deleteCart: (state, action) => {
            return []
        },
        removeCartItem: (state, action) => {
            const exist = state.find(x => x.item.id === action.payload.id)

            if(exist){
                state.splice(state.findIndex((x) => x.item.id === action.payload.id), 1) 
                
                return
            }
        }
    },
});

export const { createCart, increaseCart, decreaseCart, deleteCart, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;