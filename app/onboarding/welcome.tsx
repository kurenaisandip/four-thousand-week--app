import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { useTheme } from '../../contexts/ThemeContext';
import { SPACING } from '../../utils/constants';

export default function WelcomeScreen() {
  const router = useRouter();
  const { colors, textStyles } = useTheme();

  const handleGetStarted = () => {
    router.push('/onboarding/name');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🕐</Text>
        <Text style={[styles.title, textStyles.h1, { color: colors.textPrimary }]}>
          Four Thousand{'\n'}Weeks
        </Text>
        <Text style={[styles.subtitle, textStyles.body, { color: colors.textSecondary }]}>
          Life is finite.{'\n'}Make it count.
        </Text>
        <Text style={[styles.description, textStyles.bodySmall, { color: colors.textMuted }]}>
          Visualize your life as 4,000 weeks and see how much time you've lived and how much remains.
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          onPress={handleGetStarted}
          size="large"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 64,
    marginBottom: SPACING.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: SPACING.md,
  },
  buttonContainer: {
    paddingBottom: SPACING.lg,
  },
}); 