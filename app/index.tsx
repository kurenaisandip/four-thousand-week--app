import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';

export default function Index() {
  const router = useRouter();
  const { hasCompletedOnboarding, isLoading } = useUser();
  const { colors } = useTheme();

  useEffect(() => {
    if (!isLoading) {
      if (hasCompletedOnboarding) {
        router.replace('/(tabs)/' as any);
      } else {
        router.replace('/onboarding/welcome');
      }
    }
  }, [hasCompletedOnboarding, isLoading, router]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
