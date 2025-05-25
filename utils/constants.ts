import { GridConfig } from '../types/grid';
import { BorderRadius, Spacing } from '../types/theme';

// Life calculation constants
export const LIFE_CONSTANTS = {
  TOTAL_WEEKS: 4000,
  WEEKS_PER_YEAR: 52,
  AVERAGE_LIFESPAN_YEARS: 77,
  GRID_COLUMNS: 80,
  GRID_ROWS: 50,
} as const;

// Grid configuration
export const GRID_CONFIG: GridConfig = {
  totalWeeks: LIFE_CONSTANTS.TOTAL_WEEKS,
  columns: LIFE_CONSTANTS.GRID_COLUMNS,
  rows: LIFE_CONSTANTS.GRID_ROWS,
  cellSize: 8,
  cellSpacing: 1,
  minZoom: 0.5,
  maxZoom: 3,
};

// Design tokens
export const SPACING: Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const BORDER_RADIUS: BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  pulse: 2000,
} as const;

// Storage keys
export const STORAGE_KEYS = {
  USER_DATA: 'user_data',
  THEME_PREFERENCE: 'theme_preference',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  GRID_PREFERENCES: 'grid_preferences',
} as const;

// Date validation constants
export const DATE_VALIDATION = {
  MIN_AGE_YEARS: 0,
  MAX_AGE_YEARS: 120,
  MIN_BIRTH_YEAR: new Date().getFullYear() - 120,
  MAX_BIRTH_YEAR: new Date().getFullYear(),
} as const; 