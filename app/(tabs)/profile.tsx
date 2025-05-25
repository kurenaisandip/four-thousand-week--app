import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { BORDER_RADIUS, SPACING } from '../../utils/constants';
import { formatDate } from '../../utils/dateUtils';

export default function ProfileScreen() {
  const { colors, textStyles, theme, setTheme, toggleTheme } = useTheme();
  const { user, clearUserData } = useUser();
  const [isResetting, setIsResetting] = useState(false);

  const handleResetData = () => {
    Alert.alert(
      'Reset All Data',
      'This will delete all your data and return you to the onboarding screen. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            setIsResetting(true);
            try {
              await clearUserData();
            } catch (error) {
              Alert.alert('Error', 'Failed to reset data. Please try again.');
            } finally {
              setIsResetting(false);
            }
          },
        },
      ]
    );
  };

  const SettingItem = ({ 
    title, 
    subtitle, 
    rightElement 
  }: { 
    title: string; 
    subtitle?: string; 
    rightElement?: React.ReactNode;
  }) => (
    <View style={[styles.settingItem, { backgroundColor: colors.surface }]}>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, textStyles.body, { color: colors.textPrimary }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.settingSubtitle, textStyles.caption, { color: colors.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement && (
        <View style={styles.settingRight}>
          {rightElement}
        </View>
      )}
    </View>
  );

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[textStyles.body, { color: colors.textSecondary }]}>
            Loading profile...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* User Profile */}
        <View style={[styles.profileHeader, { backgroundColor: colors.surface }]}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={[styles.avatarText, textStyles.h2, { color: '#FFFFFF' }]}>
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={[styles.profileName, textStyles.h3, { color: colors.textPrimary }]}>
            {user.name}
          </Text>
          <Text style={[styles.profileDetails, textStyles.body, { color: colors.textSecondary }]}>
            Born: {formatDate(user.birthDate)}
          </Text>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, textStyles.h4, { color: colors.textPrimary }]}>
            Appearance
          </Text>
          
          <SettingItem
            title="Dark Mode"
            subtitle={`Currently ${theme === 'dark' ? 'enabled' : theme === 'light' ? 'disabled' : 'following system'}`}
            rightElement={
              <Switch
                value={theme === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.inputBorder, true: colors.primary }}
                thumbColor={colors.surface}
              />
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, textStyles.h4, { color: colors.textPrimary }]}>
            Data
          </Text>
          
          <SettingItem
            title="Birth Date"
            subtitle={formatDate(user.birthDate)}
          />
          
          <SettingItem
            title="Account Created"
            subtitle={formatDate(user.createdAt)}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, textStyles.h4, { color: colors.textPrimary }]}>
            About
          </Text>
          
          <SettingItem
            title="Four Thousand Weeks"
            subtitle="Inspired by Oliver Burkeman's book about time management and mortality"
          />
          
          <SettingItem
            title="Version"
            subtitle="1.0.0"
          />
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, textStyles.h4, { color: colors.error }]}>
            Danger Zone
          </Text>
          
          <View style={[styles.dangerZone, { backgroundColor: colors.surface, borderColor: colors.error }]}>
            <Text style={[styles.dangerTitle, textStyles.body, { color: colors.error }]}>
              Reset All Data
            </Text>
            <Text style={[styles.dangerSubtitle, textStyles.caption, { color: colors.textSecondary }]}>
              This will permanently delete all your data and settings.
            </Text>
            <Button
              title="Reset Data"
              onPress={handleResetData}
              variant="outline"
              loading={isResetting}
              style={styles.dangerButton}
              textStyle={{ color: colors.error }}
            />
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
  profileHeader: {
    alignItems: 'center',
    padding: SPACING.xl,
    margin: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarText: {
    fontWeight: 'bold',
  },
  profileName: {
    marginBottom: SPACING.sm,
  },
  profileDetails: {
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    marginBottom: SPACING.xs,
  },
  settingSubtitle: {
    lineHeight: 16,
  },
  settingRight: {
    marginLeft: SPACING.md,
  },
  dangerZone: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
  },
  dangerTitle: {
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  dangerSubtitle: {
    marginBottom: SPACING.md,
    lineHeight: 18,
  },
  dangerButton: {
    alignSelf: 'flex-start',
  },
}); 