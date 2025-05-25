import React from 'react';
import {
    ActivityIndicator,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { BORDER_RADIUS, SPACING } from '../../utils/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const { colors, textStyles } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: BORDER_RADIUS.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Size styles
    switch (size) {
      case 'small':
        baseStyle.paddingHorizontal = SPACING.md;
        baseStyle.paddingVertical = SPACING.sm;
        baseStyle.minHeight = 36;
        break;
      case 'large':
        baseStyle.paddingHorizontal = SPACING.xl;
        baseStyle.paddingVertical = SPACING.md;
        baseStyle.minHeight = 56;
        break;
      default: // medium
        baseStyle.paddingHorizontal = SPACING.lg;
        baseStyle.paddingVertical = SPACING.md;
        baseStyle.minHeight = 48;
        break;
    }

    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyle.backgroundColor = colors.buttonSecondary;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = colors.primary;
        break;
      default: // primary
        baseStyle.backgroundColor = colors.buttonPrimary;
        break;
    }

    // Disabled state
    if (disabled || loading) {
      baseStyle.opacity = 0.6;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      ...textStyles.button,
    };

    // Variant text colors
    switch (variant) {
      case 'secondary':
        baseTextStyle.color = colors.textPrimary;
        break;
      case 'outline':
        baseTextStyle.color = colors.primary;
        break;
      default: // primary
        baseTextStyle.color = '#FFFFFF';
        break;
    }

    // Size text styles
    switch (size) {
      case 'small':
        baseTextStyle.fontSize = 14;
        break;
      case 'large':
        baseTextStyle.fontSize = 18;
        break;
    }

    return baseTextStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#FFFFFF' : colors.primary}
          style={{ marginRight: SPACING.sm }}
        />
      )}
      <Text style={[getTextStyle(), textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
} 