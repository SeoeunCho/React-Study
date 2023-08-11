import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/useSlice';

let cart = createSlice({
  name: 'cart',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      let product = state.find((el) => el.id === action.payload);
      product.count++;
    },
    addCart(state, action) {
      state.push(action.payload);
    },
  },
});

export let { addCount, addCart } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
