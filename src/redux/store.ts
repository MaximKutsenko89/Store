import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import cartReducer from "./cartReducer";
import { api } from "./api";
import themeReducer from "./themeReducer";

export const store = configureStore({
   reducer: {
      cart: cartReducer,
      [api.reducerPath]: api.reducer,
      theme: themeReducer
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
