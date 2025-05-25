import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LifeGrid } from '../../components/grid';
import { useTheme } from '../../contexts/ThemeContext';
import { useLifeCalculations } from '../../hooks/useLifeCalculations';
import { SPACING } from '../../utils/constants';

export default function GridScreen() {
  const { colors, textStyles } = useTheme();
  const { calculations, isCalculating } = useLifeCalculations();

  if (isCalculating || !calculations) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[textStyles.body, { color: colors.textSecondary }]}>
            Calculating your life...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Stats */}
        <View style={[styles.statsHeader, { backgroundColor: colors.surface }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, textStyles.h2, { color: colors.textPrimary }]}>
              {calculations.weeksLived.toLocaleString()}
            </Text>
            <Text style={[styles.statLabel, textStyles.caption, { color: colors.textSecondary }]}>
              Weeks Lived
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, textStyles.h2, { color: colors.textPrimary }]}>
              {Math.round(calculations.lifeCompletionPercentage)}%
            </Text>
            <Text style={[styles.statLabel, textStyles.caption, { color: colors.textSecondary }]}>
              Complete
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, textStyles.h2, { color: colors.textPrimary }]}>
              {calculations.weeksRemaining.toLocaleString()}
            </Text>
            <Text style={[styles.statLabel, textStyles.caption, { color: colors.textSecondary }]}>
              Weeks Left
            </Text>
          </View>
        </View>

        {/* Life Grid */}
        <View style={styles.gridContainer}>
          <Text style={[styles.gridTitle, textStyles.h3, { color: colors.textPrimary }]}>
            Your Life in Weeks
          </Text>
          <Text style={[styles.gridSubtitle, textStyles.bodySmall, { color: colors.textSecondary }]}>
            Each square represents one week of your life
          </Text>
          
          <LifeGrid
            weeksLived={calculations.weeksLived}
            currentWeek={calculations.currentWeek}
            totalWeeks={calculations.totalWeeks}
          />
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.weekLived }]} />
            <Text style={[styles.legendText, textStyles.caption, { color: colors.textSecondary }]}>
              Weeks Lived
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.weekCurrent }]} />
            <Text style={[styles.legendText, textStyles.caption, { color: colors.textSecondary }]}>
              Current Week
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.weekFuture }]} />
            <Text style={[styles.legendText, textStyles.caption, { color: colors.textSecondary }]}>
              Future Weeks
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.lg,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
  },
  statLabel: {
    marginTop: SPACING.xs,
  },
  gridContainer: {
    padding: SPACING.md,
  },
  gridTitle: {
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  gridSubtitle: {
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
    gap: SPACING.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
  },
}); 