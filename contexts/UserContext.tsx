import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User, UserContextType } from '../types/user';
import { OnboardingStorage, UserStorage } from '../utils/storage';

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // Load user data on app start
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      
      // Load user data and onboarding status in parallel
      const [userData, onboardingCompleted] = await Promise.all([
        UserStorage.getUser(),
        OnboardingStorage.isOnboardingCompleted(),
      ]);

      setUser(userData);
      setHasCompletedOnboarding(onboardingCompleted);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    try {
      if (!user) {
        // Create new user
        const newUser: User = {
          id: generateUserId(),
          name: updates.name || '',
          birthDate: updates.birthDate || new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          ...updates,
        };

        await UserStorage.setUser(newUser);
        setUser(newUser);

        // Mark onboarding as completed if we have both name and birth date
        if (newUser.name && newUser.birthDate) {
          await OnboardingStorage.setOnboardingCompleted(true);
          setHasCompletedOnboarding(true);
        }
      } else {
        // Update existing user
        const updatedUser: User = {
          ...user,
          ...updates,
          updatedAt: new Date(),
        };

        await UserStorage.updateUser(updates);
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const clearUserData = async () => {
    try {
      await Promise.all([
        UserStorage.clearUser(),
        OnboardingStorage.resetOnboarding(),
      ]);

      setUser(null);
      setHasCompletedOnboarding(false);
    } catch (error) {
      console.error('Error clearing user data:', error);
      throw error;
    }
  };

  const value: UserContextType = {
    user,
    updateUser,
    isLoading,
    hasCompletedOnboarding,
    clearUserData,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Helper function to generate a unique user ID
function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
} 