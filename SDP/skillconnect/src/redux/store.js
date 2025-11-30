import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import serviceReducer from "./serviceSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer
  }
});
