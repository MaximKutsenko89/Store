import { ThemeContextType } from "@/types/types";
import type { RootState } from "./store";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ThemeContextType = {
   theme: "dark",
};
export const themeSlice = createSlice({
   name: "theme",
   initialState,
   reducers: {
      toggleTheme: (state) => {
         state.theme = state.theme === "dark" ? "light" : "dark";
         document.body.setAttribute("data-theme", state.theme);
      },
   },
});

export const { toggleTheme } = themeSlice.actions;
export const themeState = (state: RootState) => state.theme;
export default themeSlice.reducer;
