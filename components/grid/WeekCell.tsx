import * as Haptics from 'expo-haptics';
import React, { memo } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { WeekStatus } from '../../types/grid';
import { BORDER_RADIUS, GRID_CONFIG } from '../../utils/constants';
import { getWeekColor } from '../../utils/theme';

interface WeekCellProps {
  weekNumber: number;
  status: WeekStatus;
  size: number;
  onPress?: () => void;
}

export const WeekCell = memo(function WeekCell({ 
  weekNumber, 
  status, 
  size, 
  onPress 
}: WeekCellProps) {
  const { colors } = useTheme();
  const backgroundColor = getWeekColor(status, colors);

  const handlePress = () => {
    if (onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  const cellStyle = {
    width: size,
    height: size,
    backgroundColor,
    marginRight: GRID_CONFIG.cellSpacing,
    borderRadius: BORDER_RADIUS.sm,
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.cell, cellStyle]}
        onPress={handlePress}
        activeOpacity={0.7}
        accessibilityLabel={`Week ${weekNumber + 1}, ${status}`}
        accessibilityRole="button"
      />
    );
  }

  return (
    <Animated.View
      style={[styles.cell, cellStyle]}
      accessibilityLabel={`Week ${weekNumber + 1}, ${status}`}
    />
  );
});

const styles = StyleSheet.create({
  cell: {
    // Base styles are applied via props
  },
}); 