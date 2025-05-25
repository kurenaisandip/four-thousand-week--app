import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { BORDER_RADIUS, SPACING } from '../../utils/constants';

export default function NameScreen() {
  const router = useRouter();
  const { colors, textStyles } = useTheme();
  const { updateUser } = useUser();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!name.trim()) {
      Alert.alert('Name Required', 'Please enter your name to continue.');
      return;
    }

    setIsLoading(true);
    try {
      await updateUser({ name: name.trim() });
      router.push('/onboarding/birthdate');
    } catch (error) {
      Alert.alert('Error', 'Failed to save your name. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, textStyles.h2, { color: colors.textPrimary }]}>
          What's your name?
        </Text>
        <Text style={[styles.subtitle, textStyles.body, { color: colors.textSecondary }]}>
          We'll use this to personalize your experience.
        </Text>
        
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              borderColor: colors.inputBorder,
              color: colors.textPrimary,
            },
          ]}
          placeholder="Enter your name..."
          placeholderTextColor={colors.textMuted}
          value={name}
          onChangeText={setName}
          autoFocus
          returnKeyType="next"
          onSubmitEditing={handleContinue}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          size="large"
          disabled={!name.trim()}
          loading={isLoading}
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
  },
  title: {
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  input: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: 16,
    marginBottom: SPACING.lg,
  },
  buttonContainer: {
    paddingBottom: SPACING.lg,
  },
}); 