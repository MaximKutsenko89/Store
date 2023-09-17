import type { CartState, Product } from "@/types/types"
import type { RootState } from "./store"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const cartDataFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('cart');
const cartFromLocalStorage = cartDataFromLocalStorage ? JSON.parse(cartDataFromLocalStorage) : [];

const initialState: CartState = {
    cart: cartFromLocalStorage,
    cartIsOpen: false
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const productIdToAdd = action.payload.id;
            const updatedCart = state.cart.map(item => {
                if (item.id === productIdToAdd) {
                    return {
                        ...item,
                        count: (item.count as number) + 1,
                    };
                }
                return item;
            });

            const existingItem = state.cart.find(item => item.id === productIdToAdd);

            if (!existingItem) {
                updatedCart.push({
                    ...action.payload,
                    count: 1
                });
            }
            state.cart = updatedCart;
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        toggleCartIsOpen: (state) => {
            state.cartIsOpen = !state.cartIsOpen
            document.body.classList.toggle('scroll-block')
        },
        removeFormCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter((product) => product.id !== action.payload)
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        updatedCartByCount: (state, action: PayloadAction<{ id: number, count: number }>) => {
            const { id, count } = action.payload
            state.cart = state.cart.map((product) => {
                if (id === product.id) {
                    return {
                        ...product,
                        count: count
                    }
                }
                return product
            })
            localStorage.setItem('cart', JSON.stringify(state.cart))
        }
    },

});

export const { addToCart, toggleCartIsOpen, removeFormCart, updatedCartByCount } = cartSlice.actions
export const cartState = (state: RootState) => state.cart
export default cartSlice.reducer