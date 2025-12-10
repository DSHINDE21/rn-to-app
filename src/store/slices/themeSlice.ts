import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeMode } from "../../types/theme";

interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: "light",
};

/**
 * Theme slice managing theme mode state
 * Can be used alongside ThemeContext for Redux integration
 */
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },

    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setThemeMode, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
