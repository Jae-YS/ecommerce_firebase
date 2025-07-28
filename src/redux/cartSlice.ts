import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Product } from "../types/Product";
import {
  saveToSessionStorage,
  loadFromSessionStorage,
  removeFromSessionStorage,
} from "../utils/sessionStorage";

type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
  userEmail: string | null;
};

const initialState: CartState = {
  items: [],
  userEmail: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCart(state, action: PayloadAction<string>) {
      const email = action.payload;
      const stored = loadFromSessionStorage<CartItem[]>(`cart:${email}`);
      state.items = stored ?? [];
      state.userEmail = email;
    },

    addToCart(
      state,
      action: PayloadAction<{ product: Product; email: string }>
    ) {
      const { product, email } = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      saveToSessionStorage(`cart:${email}`, state.items);
    },

    removeFromCart(
      state,
      action: PayloadAction<{ productId: number; email: string }>
    ) {
      const { productId, email } = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      saveToSessionStorage(`cart:${email}`, state.items);
    },

    incrementQuantity(
      state,
      action: PayloadAction<{ productId: number; email: string }>
    ) {
      const { productId, email } = action.payload;
      const item = state.items.find((i) => i.id === productId);
      if (item) {
        item.quantity += 1;
        saveToSessionStorage(`cart:${email}`, state.items);
      }
    },

    decrementQuantity(
      state,
      action: PayloadAction<{ productId: number; email: string }>
    ) {
      const { productId, email } = action.payload;
      const item = state.items.find((i) => i.id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveToSessionStorage(`cart:${email}`, state.items);
      }
    },

    clearCart(state) {
      if (state.userEmail) {
        removeFromSessionStorage(`cart:${state.userEmail}`);
      }
      state.items = [];
    },
  },
});

export const {
  loadCart,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
