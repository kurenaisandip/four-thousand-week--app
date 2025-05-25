import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ColorScheme, ThemeContextType, ThemeMode } from '../types/theme';
import { ThemeStorage } from '../utils/storage';
import { getColorScheme, textStyles } from '../utils/theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeMode] = useState<ThemeMode>('system');
  const [colors, setColors] = useState<ColorScheme>(getColorScheme(false));

  // Load theme preference on app start
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Update colors when theme or system color scheme changes
  useEffect(() => {
    updateColors();
  }, [theme, systemColorScheme]);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await ThemeStorage.getTheme();
      if (savedTheme) {
        setThemeMode(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const updateColors = () => {
    let isDark = false;

    switch (theme) {
      case 'dark':
        isDark = true;
        break;
      case 'light':
        isDark = false;
        break;
      case 'system':
        isDark = systemColorScheme === 'dark';
        break;
    }

    setColors(getColorScheme(isDark));
  };

  const setTheme = async (newTheme: ThemeMode) => {
    try {
      setThemeMode(newTheme);
      await ThemeStorage.setTheme(newTheme);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
    await setTheme(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    colors,
    textStyles,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 