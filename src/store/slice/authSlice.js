import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  token: null,
  user: null
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload?.token;
      state.userId = action.payload?.userId;
      state.user = action.payload?.user;
    },
    logOut: (state) => {
      state.token = null;
      state.userId = null;
      state.user = null
    }
  }
});

export const { login, logOut } = authSlice.actions;

export default authSlice.reducer;
