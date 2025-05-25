export type WeekStatus = 'lived' | 'current' | 'future';

export interface WeekCell {
  weekNumber: number;
  status: WeekStatus;
  date: Date;
}

export interface LifeCalculations {
  weeksLived: number;
  weeksRemaining: number;
  currentWeek: number;
  ageInYears: number;
  ageInWeeks: number;
  lifeCompletionPercentage: number;
  weeksUntilNextBirthday: number;
  totalWeeks: number;
}

export interface GridState {
  zoomLevel: number;
  panOffset: { x: number; y: number };
  cellSize: number;
}

export interface GridContextType {
  gridState: GridState;
  setZoomLevel: (level: number) => void;
  setPanOffset: (offset: { x: number; y: number }) => void;
  resetView: () => void;
}

export interface GridConfig {
  totalWeeks: number;
  columns: number;
  rows: number;
  cellSize: number;
  cellSpacing: number;
  minZoom: number;
  maxZoom: number;
} 