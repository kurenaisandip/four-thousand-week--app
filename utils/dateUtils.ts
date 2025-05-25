import { LifeCalculations } from '../types/grid';
import { DATE_VALIDATION, LIFE_CONSTANTS } from './constants';

/**
 * Calculate the number of weeks between two dates
 */
export function getWeeksBetweenDates(startDate: Date, endDate: Date): number {
  const timeDifference = endDate.getTime() - startDate.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return Math.floor(daysDifference / 7);
}

/**
 * Calculate the start date of a specific week based on birth date
 */
export function getWeekStartDate(birthDate: Date, weekNumber: number): Date {
  const weekStart = new Date(birthDate);
  weekStart.setDate(weekStart.getDate() + (weekNumber * 7));
  return weekStart;
}

/**
 * Get the current week number based on birth date
 */
export function getCurrentWeekNumber(birthDate: Date): number {
  const now = new Date();
  return getWeeksBetweenDates(birthDate, now);
}

/**
 * Calculate weeks lived since birth
 */
export function calculateWeeksLived(birthDate: Date): number {
  return getCurrentWeekNumber(birthDate);
}

/**
 * Calculate estimated weeks remaining (based on 4000 week lifespan)
 */
export function calculateWeeksRemaining(birthDate: Date): number {
  const weeksLived = calculateWeeksLived(birthDate);
  return Math.max(0, LIFE_CONSTANTS.TOTAL_WEEKS - weeksLived);
}

/**
 * Calculate current age in years
 */
export function calculateAgeInYears(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Calculate life completion percentage
 */
export function calculateLifePercentage(birthDate: Date): number {
  const weeksLived = calculateWeeksLived(birthDate);
  return Math.min(100, (weeksLived / LIFE_CONSTANTS.TOTAL_WEEKS) * 100);
}

/**
 * Calculate weeks until next birthday
 */
export function calculateWeeksUntilNextBirthday(birthDate: Date): number {
  const today = new Date();
  const currentYear = today.getFullYear();
  
  // Create next birthday date
  let nextBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
  
  // If birthday has passed this year, use next year
  if (nextBirthday < today) {
    nextBirthday = new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate());
  }
  
  return getWeeksBetweenDates(today, nextBirthday);
}

/**
 * Get all life calculations for a given birth date
 */
export function getLifeCalculations(birthDate: Date): LifeCalculations {
  const weeksLived = calculateWeeksLived(birthDate);
  const currentWeek = getCurrentWeekNumber(birthDate);
  
  return {
    weeksLived,
    weeksRemaining: calculateWeeksRemaining(birthDate),
    currentWeek,
    ageInYears: calculateAgeInYears(birthDate),
    ageInWeeks: weeksLived,
    lifeCompletionPercentage: calculateLifePercentage(birthDate),
    weeksUntilNextBirthday: calculateWeeksUntilNextBirthday(birthDate),
    totalWeeks: LIFE_CONSTANTS.TOTAL_WEEKS,
  };
}

/**
 * Validate if a birth date is reasonable
 */
export function validateBirthDate(birthDate: Date): { isValid: boolean; error?: string } {
  const today = new Date();
  const birthYear = birthDate.getFullYear();
  
  // Check if date is in the future
  if (birthDate > today) {
    return { isValid: false, error: 'Birth date cannot be in the future' };
  }
  
  // Check if birth year is reasonable
  if (birthYear < DATE_VALIDATION.MIN_BIRTH_YEAR) {
    return { isValid: false, error: `Birth year cannot be before ${DATE_VALIDATION.MIN_BIRTH_YEAR}` };
  }
  
  if (birthYear > DATE_VALIDATION.MAX_BIRTH_YEAR) {
    return { isValid: false, error: `Birth year cannot be after ${DATE_VALIDATION.MAX_BIRTH_YEAR}` };
  }
  
  // Check if age is reasonable
  const age = calculateAgeInYears(birthDate);
  if (age > DATE_VALIDATION.MAX_AGE_YEARS) {
    return { isValid: false, error: `Age cannot exceed ${DATE_VALIDATION.MAX_AGE_YEARS} years` };
  }
  
  return { isValid: true };
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format age for display
 */
export function formatAge(birthDate: Date): string {
  const years = calculateAgeInYears(birthDate);
  const weeks = calculateWeeksLived(birthDate);
  return `${years} years, ${weeks} weeks`;
}

/**
 * Get the date range for a specific week
 */
export function getWeekDateRange(birthDate: Date, weekNumber: number): { start: Date; end: Date } {
  const start = getWeekStartDate(birthDate, weekNumber);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  
  return { start, end };
}

/**
 * Check if a specific week has been lived
 */
export function hasWeekBeenLived(birthDate: Date, weekNumber: number): boolean {
  const currentWeek = getCurrentWeekNumber(birthDate);
  return weekNumber < currentWeek;
}

/**
 * Check if a specific week is the current week
 */
export function isCurrentWeek(birthDate: Date, weekNumber: number): boolean {
  const currentWeek = getCurrentWeekNumber(birthDate);
  return weekNumber === currentWeek;
}

/**
 * Get week status for grid rendering
 */
export function getWeekStatus(birthDate: Date, weekNumber: number): 'lived' | 'current' | 'future' {
  if (hasWeekBeenLived(birthDate, weekNumber)) {
    return 'lived';
  } else if (isCurrentWeek(birthDate, weekNumber)) {
    return 'current';
  } else {
    return 'future';
  }
} 