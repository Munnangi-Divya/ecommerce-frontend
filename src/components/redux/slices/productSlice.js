import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await axios.get('https://ecommerce-back-2-m0xb.onrender.com/api/products');
  return res.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: { products: [], loading: false },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      });
  }
});

export default productSlice.reducer;
