import { configureStore, Store } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/CounterSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
