import { useCallback, useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { LifeCalculations } from '../types/grid';
import { getLifeCalculations } from '../utils/dateUtils';

export function useLifeCalculations() {
  const { user } = useUser();
  const [calculations, setCalculations] = useState<LifeCalculations | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Calculate life statistics
  const calculateLife = useCallback(async () => {
    if (!user?.birthDate) {
      setCalculations(null);
      return;
    }

    setIsCalculating(true);
    try {
      const lifeCalcs = getLifeCalculations(user.birthDate);
      setCalculations(lifeCalcs);
    } catch (error) {
      console.error('Error calculating life statistics:', error);
      setCalculations(null);
    } finally {
      setIsCalculating(false);
    }
  }, [user?.birthDate]);

  // Recalculate when user data changes
  useEffect(() => {
    calculateLife();
  }, [calculateLife]);

  // Set up automatic updates (check every hour for week changes)
  useEffect(() => {
    if (!user?.birthDate) return;

    const interval = setInterval(() => {
      calculateLife();
    }, 60 * 60 * 1000); // Check every hour

    return () => clearInterval(interval);
  }, [calculateLife, user?.birthDate]);

  // Force recalculation
  const refresh = useCallback(() => {
    calculateLife();
  }, [calculateLife]);

  return {
    calculations,
    isCalculating,
    refresh,
  };
} 