import { ColorScheme, Shadow, TextStyles } from '../types/theme';
import { BORDER_RADIUS, SPACING } from './constants';

/**
 * Light theme color scheme
 */
export const lightColors: ColorScheme = {
  // Week states
  weekLived: '#22C55E',
  weekCurrent: '#F59E0B',
  weekFuture: '#E5E7EB',
  
  // UI elements
  background: '#FFFFFF',
  surface: '#F9FAFB',
  primary: '#3B82F6',
  secondary: '#6B7280',
  
  // Text
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  
  // Interactive
  buttonPrimary: '#3B82F6',
  buttonSecondary: '#E5E7EB',
  inputBorder: '#D1D5DB',
  inputFocus: '#3B82F6',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  
  // Borders and dividers
  border: '#E5E7EB',
  divider: '#F3F4F6',
};

/**
 * Dark theme color scheme
 */
export const darkColors: ColorScheme = {
  // Week states
  weekLived: '#16A34A',
  weekCurrent: '#D97706',
  weekFuture: '#374151',
  
  // UI elements
  background: '#111827',
  surface: '#1F2937',
  primary: '#3B82F6',
  secondary: '#9CA3AF',
  
  // Text
  textPrimary: '#F9FAFB',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  
  // Interactive
  buttonPrimary: '#3B82F6',
  buttonSecondary: '#374151',
  inputBorder: '#4B5563',
  inputFocus: '#3B82F6',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  
  // Borders and dividers
  border: '#374151',
  divider: '#1F2937',
};

/**
 * Typography styles
 */
export const textStyles: TextStyles = {
  // Headers
  h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: '600', lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
  h4: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
  
  // Body text
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  bodySmall: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  
  // UI elements
  button: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  label: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
};

/**
 * Shadow styles
 */
export const shadows = {
  sm: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  } as Shadow,
  md: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  } as Shadow,
  lg: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  } as Shadow,
};

/**
 * Get color scheme based on theme mode
 */
export function getColorScheme(isDark: boolean): ColorScheme {
  return isDark ? darkColors : lightColors;
}

/**
 * Create theme object with all design tokens
 */
export function createTheme(isDark: boolean) {
  return {
    colors: getColorScheme(isDark),
    textStyles,
    spacing: SPACING,
    borderRadius: BORDER_RADIUS,
    shadows,
    isDark,
  };
}

/**
 * Week status color helpers
 */
export function getWeekColor(status: 'lived' | 'current' | 'future', colors: ColorScheme): string {
  switch (status) {
    case 'lived':
      return colors.weekLived;
    case 'current':
      return colors.weekCurrent;
    case 'future':
      return colors.weekFuture;
    default:
      return colors.weekFuture;
  }
}

/**
 * Opacity variants for colors
 */
export function withOpacity(color: string, opacity: number): string {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Darken a color by a percentage
 */
export function darkenColor(color: string, percentage: number): string {
  const hex = color.replace('#', '');
  const r = Math.max(0, parseInt(hex.substring(0, 2), 16) * (1 - percentage / 100));
  const g = Math.max(0, parseInt(hex.substring(2, 4), 16) * (1 - percentage / 100));
  const b = Math.max(0, parseInt(hex.substring(4, 6), 16) * (1 - percentage / 100));
  
  return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
}

/**
 * Lighten a color by a percentage
 */
export function lightenColor(color: string, percentage: number): string {
  const hex = color.replace('#', '');
  const r = Math.min(255, parseInt(hex.substring(0, 2), 16) + (255 - parseInt(hex.substring(0, 2), 16)) * (percentage / 100));
  const g = Math.min(255, parseInt(hex.substring(2, 4), 16) + (255 - parseInt(hex.substring(2, 4), 16)) * (percentage / 100));
  const b = Math.min(255, parseInt(hex.substring(4, 6), 16) + (255 - parseInt(hex.substring(4, 6), 16)) * (percentage / 100));
  
  return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
} 