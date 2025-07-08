// src/features/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../api/auth";

// جلب الـ token من localStorage لو موجود
const initialToken = localStorage.getItem("token") || null;

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const data = await loginApi(credentials);
  const token = data.token;
  localStorage.setItem("token", token); // خزن الـ token في localStorage
  return token;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken, // استخدم الـ token من localStorage
    status: "idle",
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.status = "idle";
      localStorage.removeItem("token"); // امسح الـ token من localStorage
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.status = "failed";
      }),
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
