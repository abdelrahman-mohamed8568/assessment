import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../api/auth";

export const login = createAsyncThunk("auth/", async (credentials) => {
  const data = await loginApi(credentials);
  return data.token;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    status: "idle",
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.status = "idle";
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
