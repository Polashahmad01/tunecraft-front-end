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
    login: (state) => {
      console.log("Login");
    },
    logOut: (state) => {
      console.log("logOut");
    }
  }
});

export const { login, logOut } = authSlice.actions;

export default authSlice.reducer;
