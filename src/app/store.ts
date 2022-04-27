import { configureStore, Store } from "@reduxjs/toolkit";
import reducer from "../rootReducer";

const store = configureStore({
    reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
