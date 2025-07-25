import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('user/login', async (credentials) => {
  const res = await axios.post('https://ecommerce-back-2-m0xb.onrender.com/api/users/login', credentials);
  return res.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: { user: JSON.parse(localStorage.getItem('user')) || null, loading: false },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
