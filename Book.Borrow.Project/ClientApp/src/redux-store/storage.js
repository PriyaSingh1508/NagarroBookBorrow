import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
    //   localStorage.removeItem("userId");
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
});

export const authActions = authSlice.actions;

export const storage = configureStore({
  reducer: authSlice.reducer,
});