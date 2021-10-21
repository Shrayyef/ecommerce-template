import {createSlice} from '@reduxjs/toolkit';

export const cartReducer = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload.item];
      return state;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        one => one.id !== action.payload.item.id,
      );
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addToCart, removeFromCart} = cartReducer.actions;

export default cartReducer.reducer;
