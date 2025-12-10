import { Colors, ThemeMode } from "../types/theme";

// Light theme color palette (black and white scheme)
export const lightColors: Colors = {
  background: "#FFFFFF",
  surface: "#F5F5F5",
  primary: "#000000",
  secondary: "#808080",
  text: "#000000",
  textSecondary: "#666666",
  border: "#E0E0E0",
  error: "#FF0000",
  success: "#00AA00",
  disabled: "#CCCCCC",
};

//Dark theme color palette (black and white scheme)
export const darkColors: Colors = {
  background: "#000000",
  surface: "#1A1A1A",
  primary: "#FFFFFF",
  secondary: "#808080",
  text: "#FFFFFF",
  textSecondary: "#CCCCCC",
  border: "#333333",
  error: "#FF4444",
  success: "#44FF44",
  disabled: "#666666",
};

export const getColors = (mode: ThemeMode): Colors => {
  return mode === "light" ? lightColors : darkColors;
};
