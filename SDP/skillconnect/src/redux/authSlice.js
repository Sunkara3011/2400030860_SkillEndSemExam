import { createSlice } from "@reduxjs/toolkit";

const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
const savedUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: savedUsers,
    currentUser: savedUser
  },
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    loginUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    }
  }
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
