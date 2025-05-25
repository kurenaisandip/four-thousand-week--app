import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { useLifeCalculations } from '../../hooks/useLifeCalculations';
import { BORDER_RADIUS, SPACING } from '../../utils/constants';
import { formatAge, formatDate } from '../../utils/dateUtils';

export default function StatsScreen() {
  const { colors, textStyles } = useTheme();
  const { calculations, isCalculating } = useLifeCalculations();
  const { user } = useUser();

  if (isCalculating || !calculations || !user) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[textStyles.body, { color: colors.textSecondary }]}>
            Loading statistics...
          </Text>
        </View>
      </View>
    );
  }

  const StatCard = ({ title, value, subtitle }: { title: string; value: string; subtitle?: string }) => (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <Text style={[styles.cardTitle, textStyles.label, { color: colors.textSecondary }]}>
        {title}
      </Text>
      <Text style={[styles.cardValue, textStyles.h2, { color: colors.textPrimary }]}>
        {value}
      </Text>
      {subtitle && (
        <Text style={[styles.cardSubtitle, textStyles.caption, { color: colors.textMuted }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={[styles.userInfo, { backgroundColor: colors.surface }]}>
          <Text style={[styles.userName, textStyles.h3, { color: colors.textPrimary }]}>
            {user.name}
          </Text>
          <Text style={[styles.userDetails, textStyles.body, { color: colors.textSecondary }]}>
            Born: {formatDate(user.birthDate)}
          </Text>
          <Text style={[styles.userDetails, textStyles.body, { color: colors.textSecondary }]}>
            Age: {formatAge(user.birthDate)}
          </Text>
        </View>

        {/* Life Progress */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, textStyles.h3, { color: colors.textPrimary }]}>
            Life Progress
          </Text>
          
          <View style={styles.cardRow}>
            <StatCard
              title="Weeks Lived"
              value={calculations.weeksLived.toLocaleString()}
              subtitle={`${calculations.ageInYears} years`}
            />
            <StatCard
              title="Weeks Remaining"
              value={calculations.weeksRemaining.toLocaleString()}
              subtitle="Estimated"
            />
          </View>

          <View style={styles.cardRow}>
            <StatCard
              title="Life Complete"
              value={`${Math.round(calculations.lifeCompletionPercentage)}%`}
              subtitle={`${(calculations.lifeCompletionPercentage).toFixed(1)}% exactly`}
            />
            <StatCard
              title="Current Week"
              value={`#${calculations.currentWeek + 1}`}
              subtitle="This week"
            />
          </View>
        </View>

        {/* Time Insights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, textStyles.h3, { color: colors.textPrimary }]}>
            Time Insights
          </Text>
          
          <StatCard
            title="Weeks Until Next Birthday"
            value={calculations.weeksUntilNextBirthday.toString()}
            subtitle={`${Math.round(calculations.weeksUntilNextBirthday / 4.33)} months approximately`}
          />

          <StatCard
            title="Average Lifespan"
            value="4,000 weeks"
            subtitle="77 years (global average)"
          />

          <StatCard
            title="Days Lived"
            value={(calculations.weeksLived * 7).toLocaleString()}
            subtitle="Every day counts"
          />
        </View>

        {/* Perspective */}
        <View style={[styles.perspective, { backgroundColor: colors.surface }]}>
          <Text style={[styles.perspectiveTitle, textStyles.h4, { color: colors.textPrimary }]}>
            💭 Perspective
          </Text>
          <Text style={[styles.perspectiveText, textStyles.body, { color: colors.textSecondary }]}>
            You have lived {Math.round(calculations.lifeCompletionPercentage)}% of an average human lifespan. 
            Each week is precious and finite. Make them count.
          </Text>
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
  userInfo: {
    margin: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  userName: {
    marginBottom: SPACING.sm,
  },
  userDetails: {
    marginBottom: SPACING.xs,
  },
  section: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  cardRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  card: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  cardTitle: {
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  cardValue: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardSubtitle: {
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  perspective: {
    margin: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
  },
  perspectiveTitle: {
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  perspectiveText: {
    textAlign: 'center',
    lineHeight: 24,
  },
}); 