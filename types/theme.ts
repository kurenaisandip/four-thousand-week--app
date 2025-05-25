export type ThemeMode = 'light' | 'dark' | 'system';

export interface ColorScheme {
  // Week states
  weekLived: string;
  weekCurrent: string;
  weekFuture: string;
  
  // UI elements
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  
  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  
  // Interactive
  buttonPrimary: string;
  buttonSecondary: string;
  inputBorder: string;
  inputFocus: string;
  
  // Status colors
  success: string;
  warning: string;
  error: string;
  
  // Borders and dividers
  border: string;
  divider: string;
}

export interface TextStyles {
  // Headers
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  h4: TextStyle;
  
  // Body text
  body: TextStyle;
  bodySmall: TextStyle;
  
  // UI elements
  button: TextStyle;
  caption: TextStyle;
  label: TextStyle;
}

export interface TextStyle {
  fontSize: number;
  fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold';
  lineHeight: number;
}

export interface ThemeContextType {
  theme: ThemeMode;
  colors: ColorScheme;
  textStyles: TextStyles;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export interface BorderRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface Shadow {
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
} 