/**
 * Theme mode type
 */
export type ThemeMode = 'light' | 'dark';

/**
 * Color palette interface
 */
export interface Colors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  disabled: string;
}

/**
 * Spacing values type
 */
export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

/**
 * Typography values type
 */
export interface Typography {
  sizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
  };
  weights: {
    regular: '400';
    medium: '500';
    semibold: '600';
    bold: '700';
  };
}

/**
 * Theme interface containing all theme values
 */
export interface Theme {
  mode: ThemeMode;
  colors: Colors;
  spacing: Spacing;
  typography: Typography;
}

