import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, Product } from './types';
import Swal from 'sweetalert2'

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
                Swal.fire({
                    title: "Data added Successfull",
                    icon: "success"
                });
                state.cartItems.push({ ...item, quantity: 1 });
            } else {
                Swal.fire({
                    title: "Already Added!!",
                    icon: "warning"
                });
            }
        },
        removeFromCart(state, action: PayloadAction<number>) {
            state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
            Swal.fire({
                title: "item remove successfull",
                icon: "success"
              });
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
                Swal.fire({
                    title: "Cant be less than 1",
                    icon: "warning"
                });
            }
        },
        addToLike(state, action: PayloadAction<Product>) {
            const item = action.payload;
            const exists = state.likeItems.find(i => i.id === item.id);
            if (!exists) {
                state.likeItems.push(item);
                Swal.fire({
                    title: "Item Liked",
                    icon: "success"
                  });
            } else {
                Swal.fire({
                    title: "Item dislike",
                    icon: "warning"
                  });
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

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity, addToLike, removeFromLike, clearLikes } = cartSlice.actions;
export default cartSlice.reducer;
