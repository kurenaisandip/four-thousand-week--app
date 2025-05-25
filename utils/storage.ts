import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode } from '../types/theme';
import { User } from '../types/user';
import { STORAGE_KEYS } from './constants';

/**
 * Generic storage utilities
 */
export class StorageManager {
  /**
   * Store a value in AsyncStorage
   */
  static async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error storing ${key}:`, error);
      throw new Error(`Failed to store ${key}`);
    }
  }

  /**
   * Retrieve a value from AsyncStorage
   */
  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error retrieving ${key}:`, error);
      return null;
    }
  }

  /**
   * Remove a value from AsyncStorage
   */
  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw new Error(`Failed to remove ${key}`);
    }
  }

  /**
   * Clear all AsyncStorage data
   */
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw new Error('Failed to clear storage');
    }
  }

  /**
   * Get all keys from AsyncStorage
   */
  static async getAllKeys(): Promise<readonly string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }
}

/**
 * User data storage utilities
 */
export class UserStorage {
  /**
   * Store user data
   */
  static async setUser(user: User): Promise<void> {
    // Convert Date objects to ISO strings for storage
    const userForStorage = {
      ...user,
      birthDate: user.birthDate.toISOString(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
    
    await StorageManager.setItem(STORAGE_KEYS.USER_DATA, userForStorage);
  }

  /**
   * Retrieve user data
   */
  static async getUser(): Promise<User | null> {
    const userData = await StorageManager.getItem<any>(STORAGE_KEYS.USER_DATA);
    
    if (!userData) {
      return null;
    }

    // Convert ISO strings back to Date objects
    return {
      ...userData,
      birthDate: new Date(userData.birthDate),
      createdAt: new Date(userData.createdAt),
      updatedAt: new Date(userData.updatedAt),
    };
  }

  /**
   * Update user data
   */
  static async updateUser(updates: Partial<User>): Promise<void> {
    const existingUser = await this.getUser();
    
    if (!existingUser) {
      throw new Error('No existing user data found');
    }

    const updatedUser: User = {
      ...existingUser,
      ...updates,
      updatedAt: new Date(),
    };

    await this.setUser(updatedUser);
  }

  /**
   * Clear user data
   */
  static async clearUser(): Promise<void> {
    await StorageManager.removeItem(STORAGE_KEYS.USER_DATA);
  }

  /**
   * Check if user data exists
   */
  static async hasUser(): Promise<boolean> {
    const user = await this.getUser();
    return user !== null;
  }
}

/**
 * Theme storage utilities
 */
export class ThemeStorage {
  /**
   * Store theme preference
   */
  static async setTheme(theme: ThemeMode): Promise<void> {
    await StorageManager.setItem(STORAGE_KEYS.THEME_PREFERENCE, theme);
  }

  /**
   * Retrieve theme preference
   */
  static async getTheme(): Promise<ThemeMode | null> {
    return await StorageManager.getItem<ThemeMode>(STORAGE_KEYS.THEME_PREFERENCE);
  }

  /**
   * Clear theme preference
   */
  static async clearTheme(): Promise<void> {
    await StorageManager.removeItem(STORAGE_KEYS.THEME_PREFERENCE);
  }
}

/**
 * Onboarding storage utilities
 */
export class OnboardingStorage {
  /**
   * Mark onboarding as completed
   */
  static async setOnboardingCompleted(completed: boolean = true): Promise<void> {
    await StorageManager.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, completed);
  }

  /**
   * Check if onboarding is completed
   */
  static async isOnboardingCompleted(): Promise<boolean> {
    const completed = await StorageManager.getItem<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETED);
    return completed === true;
  }

  /**
   * Reset onboarding status
   */
  static async resetOnboarding(): Promise<void> {
    await StorageManager.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
  }
}

/**
 * Grid preferences storage utilities
 */
export class GridStorage {
  /**
   * Store grid preferences
   */
  static async setGridPreferences(preferences: any): Promise<void> {
    await StorageManager.setItem(STORAGE_KEYS.GRID_PREFERENCES, preferences);
  }

  /**
   * Retrieve grid preferences
   */
  static async getGridPreferences(): Promise<any | null> {
    return await StorageManager.getItem(STORAGE_KEYS.GRID_PREFERENCES);
  }

  /**
   * Clear grid preferences
   */
  static async clearGridPreferences(): Promise<void> {
    await StorageManager.removeItem(STORAGE_KEYS.GRID_PREFERENCES);
  }
}

/**
 * Utility function to migrate data between app versions
 */
export class DataMigration {
  /**
   * Check if data migration is needed
   */
  static async needsMigration(): Promise<boolean> {
    // This would check for version differences and data structure changes
    // For now, we'll return false as this is the initial version
    return false;
  }

  /**
   * Perform data migration
   */
  static async migrate(): Promise<void> {
    // Future migration logic would go here
    console.log('Data migration completed');
  }
}

/**
 * Backup and restore utilities
 */
export class BackupManager {
  /**
   * Create a backup of all app data
   */
  static async createBackup(): Promise<string> {
    try {
      const user = await UserStorage.getUser();
      const theme = await ThemeStorage.getTheme();
      const onboardingCompleted = await OnboardingStorage.isOnboardingCompleted();
      const gridPreferences = await GridStorage.getGridPreferences();

      const backup = {
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        data: {
          user,
          theme,
          onboardingCompleted,
          gridPreferences,
        },
      };

      return JSON.stringify(backup);
    } catch (error) {
      console.error('Error creating backup:', error);
      throw new Error('Failed to create backup');
    }
  }

  /**
   * Restore data from backup
   */
  static async restoreBackup(backupString: string): Promise<void> {
    try {
      const backup = JSON.parse(backupString);
      
      if (!backup.data) {
        throw new Error('Invalid backup format');
      }

      const { user, theme, onboardingCompleted, gridPreferences } = backup.data;

      // Restore user data
      if (user) {
        await UserStorage.setUser(user);
      }

      // Restore theme
      if (theme) {
        await ThemeStorage.setTheme(theme);
      }

      // Restore onboarding status
      if (onboardingCompleted !== undefined) {
        await OnboardingStorage.setOnboardingCompleted(onboardingCompleted);
      }

      // Restore grid preferences
      if (gridPreferences) {
        await GridStorage.setGridPreferences(gridPreferences);
      }

    } catch (error) {
      console.error('Error restoring backup:', error);
      throw new Error('Failed to restore backup');
    }
  }
} 