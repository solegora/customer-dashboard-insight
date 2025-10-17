import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../slices/customerSlice";

export const store = configureStore({
    reducer: {
        customer: customerReducer,
    },
});

// ✅ Typed definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
