import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { GRID_CONFIG, SPACING } from '../../utils/constants';
import { getWeekStatus } from '../../utils/dateUtils';
import { WeekCell } from './WeekCell';

interface LifeGridProps {
  weeksLived: number;
  currentWeek: number;
  totalWeeks: number;
  onWeekPress?: (weekNumber: number) => void;
}

export function LifeGrid({ weeksLived, currentWeek, totalWeeks, onWeekPress }: LifeGridProps) {
  const { colors } = useTheme();
  const { user } = useUser();

  // Generate grid data
  const gridData = useMemo(() => {
    if (!user?.birthDate) return [];

    const weeks = [];
    for (let i = 0; i < totalWeeks; i++) {
      const status = getWeekStatus(user.birthDate, i);
      weeks.push({
        weekNumber: i,
        status,
      });
    }
    return weeks;
  }, [user?.birthDate, totalWeeks]);

  // Organize weeks into rows
  const rows = useMemo(() => {
    const rowsArray = [];
    for (let i = 0; i < gridData.length; i += GRID_CONFIG.columns) {
      rowsArray.push(gridData.slice(i, i + GRID_CONFIG.columns));
    }
    return rowsArray;
  }, [gridData]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
      >
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((week) => (
              <WeekCell
                key={week.weekNumber}
                weekNumber={week.weekNumber}
                status={week.status}
                size={GRID_CONFIG.cellSize}
                onPress={onWeekPress ? () => onWeekPress(week.weekNumber) : undefined}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: SPACING.md,
  },
  gridContainer: {
    paddingVertical: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    marginBottom: GRID_CONFIG.cellSpacing,
  },
}); 