// src/redux/cart/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  productId: string;
  quantity: number;
  price: number; // Add price to the CartItem interface
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<{ productId: string, quantity: number, price: number }>) => {
      const { productId, quantity, price } = action.payload;
      const existingItem = state.items.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ productId, quantity, price });
      }
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string, quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selector to calculate the total amount
export const selectTotalAmount = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

export default cartSlice.reducer;
