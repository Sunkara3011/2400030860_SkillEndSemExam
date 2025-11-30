 import { createSlice } from "@reduxjs/toolkit";

const savedServices = JSON.parse(localStorage.getItem("services")) || [];

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    list: savedServices
  },
  reducers: {
    addService: (state, action) => {
      state.list.push(action.payload);
      localStorage.setItem("services", JSON.stringify(state.list));
    },
    updateService: (state, action) => {
      const index = state.list.findIndex(s => s.id === action.payload.id);
      state.list[index] = action.payload;
      localStorage.setItem("services", JSON.stringify(state.list));
    },
    deleteService: (state, action) => {
      state.list = state.list.filter(s => s.id !== action.payload);
      localStorage.setItem("services", JSON.stringify(state.list));
    }
  }
});

export const { addService, updateService, deleteService } = serviceSlice.actions;
export default serviceSlice.reducer;
