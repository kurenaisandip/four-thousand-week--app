import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { SPACING } from '../../utils/constants';
import { validateBirthDate } from '../../utils/dateUtils';

export default function BirthDateScreen() {
  const router = useRouter();
  const { colors, textStyles } = useTheme();
  const { updateUser } = useUser();
  const [birthDate, setBirthDate] = useState(new Date(1990, 0, 1));
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  const handleContinue = async () => {
    const validation = validateBirthDate(birthDate);
    if (!validation.isValid) {
      Alert.alert('Invalid Date', validation.error);
      return;
    }

    setIsLoading(true);
    try {
      await updateUser({ birthDate });
      router.replace('/(tabs)/' as any);
    } catch (error) {
      Alert.alert('Error', 'Failed to save your birth date. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, textStyles.h2, { color: colors.textPrimary }]}>
          When were you born?
        </Text>
        <Text style={[styles.subtitle, textStyles.body, { color: colors.textSecondary }]}>
          We'll use this to calculate your life progress.
        </Text>
        
        <View style={styles.dateContainer}>
          {Platform.OS === 'android' && !showPicker && (
            <Button
              title={birthDate.toLocaleDateString()}
              onPress={showDatePicker}
              variant="outline"
              style={styles.dateButton}
            />
          )}
          
          {showPicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
              minimumDate={new Date(1900, 0, 1)}
              style={styles.datePicker}
            />
          )}
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Complete Setup"
          onPress={handleContinue}
          size="large"
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
  dateContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  dateButton: {
    minWidth: 200,
  },
  datePicker: {
    width: '100%',
    height: 200,
  },
  buttonContainer: {
    paddingBottom: SPACING.lg,
  },
}); 