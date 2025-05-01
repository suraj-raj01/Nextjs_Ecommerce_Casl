import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, Product } from './types';
import {toast} from "react-hot-toast"

const initialState: CartState = {
    cartItems: [],
    likeItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            const item = action.payload;
            console.log(state);
            const existing = state.cartItems.find(i => i.id === item.id);
            if (!existing) {
                alert("item added successfully")
                state.cartItems.push({ ...item, quantity: 1 });
            } else {
                alert("item already added")
                // existing.quantity += 1;
            }
        },
        removeFromCart(state, action: PayloadAction<number>) {
            state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
            alert("item remove successfull")
        },
        clearCart(state) {
            state.cartItems = [];
        },

        incrementQuantity(state, action: PayloadAction<number>) {
            const item = state.cartItems.find(i => i.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity(state, action: PayloadAction<number>) {
            const item = state.cartItems.find(i => i.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                alert("Item cant be less than one")
            }
        },
        addToLike(state, action: PayloadAction<Product>) {
            const item = action.payload;
            const exists = state.likeItems.find(i => i.id === item.id);
            if (!exists) {
                state.likeItems.push(item);
                alert("Item liked!");
            } else {
                alert("Already liked!");
            }
        },

        removeFromLike(state, action: PayloadAction<number>) {
            state.likeItems = state.likeItems.filter(i => i.id !== action.payload);
            alert("Item removed from likes");
        },

        clearLikes(state) {
            state.likeItems = [];
        },

    },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity,addToLike,removeFromLike,clearLikes } = cartSlice.actions;
export default cartSlice.reducer;
