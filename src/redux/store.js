import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

const store = configureStore({
  reducer: rootReducer,
});

export const getState = store.getState;
export const dispatch = store.dispatch;

export default store;
