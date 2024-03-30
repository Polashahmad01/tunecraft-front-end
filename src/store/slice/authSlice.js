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
      state.token = action.payload.token;
      state.userId = action.payload.data._id;
      state.user = action.payload.data;
    },
    logOut: (state) => {
      console.log("logOut");
    }
  }
});

export const { login, logOut } = authSlice.actions;

export default authSlice.reducer;
