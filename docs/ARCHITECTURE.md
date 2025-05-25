# Four Thousand Weeks - Technical Architecture

## Overview

This document outlines the technical architecture for the Four Thousand Weeks React Native Expo application, including component structure, data flow, and implementation details.

## Technology Stack

### Core Technologies
- **React Native**: 0.79.2
- **Expo SDK**: 53+
- **TypeScript**: 5.8.3
- **Expo Router**: 5.0.6

### Key Dependencies
- `@react-native-async-storage/async-storage`: Local data persistence
- `react-native-svg`: Grid visualization
- `expo-haptics`: Tactile feedback
- `react-native-reanimated`: Smooth animations
- `react-native-gesture-handler`: Touch interactions
- `expo-date-picker`: Date selection UI

## Project Structure

```
four-thousand-weeks/
├── app/                          # Expo Router pages
│   ├── (tabs)/                   # Tab navigation
│   │   ├── index.tsx            # Main grid view
│   │   ├── profile.tsx          # User profile/settings
│   │   └── stats.tsx            # Statistics view
│   ├── onboarding/              # Onboarding flow
│   │   ├── welcome.tsx          # Welcome screen
│   │   ├── name.tsx             # Name input
│   │   └── birthdate.tsx        # Birth date input
│   ├── _layout.tsx              # Root layout
│   └── index.tsx                # Entry point
├── components/                   # Reusable components
│   ├── ui/                      # Basic UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── DatePicker.tsx
│   │   └── LoadingSpinner.tsx
│   ├── grid/                    # Grid-related components
│   │   ├── LifeGrid.tsx         # Main grid component
│   │   ├── WeekCell.tsx         # Individual week cell
│   │   ├── GridControls.tsx     # Zoom/pan controls
│   │   └── GridLegend.tsx       # Color legend
│   └── stats/                   # Statistics components
│       ├── ProgressBar.tsx
│       ├── StatsCard.tsx
│       └── TimeRemaining.tsx
├── hooks/                       # Custom React hooks
│   ├── useUserData.ts           # User data management
│   ├── useLifeCalculations.ts   # Life calculations
│   ├── useTheme.ts              # Theme management
│   └── useGridState.ts          # Grid state management
├── utils/                       # Utility functions
│   ├── dateUtils.ts             # Date calculations
│   ├── gridUtils.ts             # Grid calculations
│   ├── storage.ts               # AsyncStorage wrapper
│   └── constants.ts             # App constants
├── types/                       # TypeScript type definitions
│   ├── user.ts
│   ├── grid.ts
│   └── theme.ts
├── contexts/                    # React contexts
│   ├── UserContext.tsx          # User data context
│   ├── ThemeContext.tsx         # Theme context
│   └── GridContext.tsx          # Grid state context
└── assets/                      # Static assets
    ├── images/
    └── fonts/
```

## Component Architecture

### Core Components

#### 1. LifeGrid Component
```typescript
interface LifeGridProps {
  weeksLived: number;
  currentWeek: number;
  totalWeeks: number;
  onWeekPress?: (weekNumber: number) => void;
}
```

**Responsibilities:**
- Render 4,000 week grid (80×50)
- Handle zoom and pan gestures
- Optimize rendering performance
- Update colors based on week status

#### 2. WeekCell Component
```typescript
interface WeekCellProps {
  weekNumber: number;
  status: 'lived' | 'current' | 'future';
  size: number;
  onPress?: () => void;
}
```

**Responsibilities:**
- Render individual week cell
- Apply appropriate styling based on status
- Handle touch interactions

#### 3. OnboardingFlow Components
- **WelcomeScreen**: Introduction and app explanation
- **NameInput**: Collect user's name
- **BirthDateInput**: Date picker for birth date
- **SetupComplete**: Confirmation and transition to main app

### Data Flow Architecture

```
User Input → Validation → Storage → Calculations → UI Update
     ↓           ↓           ↓           ↓           ↓
  DatePicker → dateUtils → AsyncStorage → useLifeCalculations → LifeGrid
```

## State Management

### Context Providers

#### UserContext
```typescript
interface UserContextType {
  user: User | null;
  updateUser: (user: Partial<User>) => Promise<void>;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
}
```

#### ThemeContext
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  colors: ColorScheme;
  toggleTheme: () => void;
}
```

#### GridContext
```typescript
interface GridContextType {
  zoomLevel: number;
  panOffset: { x: number; y: number };
  setZoomLevel: (level: number) => void;
  setPanOffset: (offset: { x: number; y: number }) => void;
  resetView: () => void;
}
```

## Data Models

### User Model
```typescript
interface User {
  id: string;
  name: string;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Life Calculations Model
```typescript
interface LifeCalculations {
  weeksLived: number;
  weeksRemaining: number;
  currentWeek: number;
  ageInYears: number;
  ageInWeeks: number;
  lifeCompletionPercentage: number;
  weeksUntilNextBirthday: number;
}
```

## Performance Optimizations

### Grid Rendering
1. **Virtualization**: Only render visible cells
2. **Memoization**: Use React.memo for WeekCell components
3. **Batch Updates**: Group state updates to minimize re-renders
4. **Native Driver**: Use native animations for smooth interactions

### Memory Management
1. **Lazy Loading**: Load grid sections on demand
2. **Image Optimization**: Use appropriate image formats and sizes
3. **Component Cleanup**: Proper cleanup of event listeners and timers

## Data Persistence

### AsyncStorage Structure
```typescript
interface StorageKeys {
  USER_DATA: 'user_data';
  THEME_PREFERENCE: 'theme_preference';
  ONBOARDING_COMPLETED: 'onboarding_completed';
  GRID_PREFERENCES: 'grid_preferences';
}
```

### Storage Utilities
```typescript
class StorageManager {
  static async setUser(user: User): Promise<void>;
  static async getUser(): Promise<User | null>;
  static async clearUserData(): Promise<void>;
  static async setTheme(theme: string): Promise<void>;
  static async getTheme(): Promise<string | null>;
}
```

## Date Calculations

### Core Calculation Logic
```typescript
class LifeCalculator {
  static calculateWeeksLived(birthDate: Date): number;
  static calculateCurrentWeek(birthDate: Date): number;
  static calculateWeeksRemaining(birthDate: Date): number;
  static calculateLifePercentage(birthDate: Date): number;
  static getWeekStartDate(birthDate: Date, weekNumber: number): Date;
}
```

### Time Zone Handling
- All calculations use UTC to avoid time zone issues
- Birth date stored as ISO string
- Current date calculations account for user's local time zone

## Animation Strategy

### Grid Animations
1. **Initial Load**: Fade-in animation for the entire grid
2. **Week Transitions**: Smooth color transition when weeks change
3. **Zoom/Pan**: Native-driven gesture animations
4. **Progress Updates**: Animated progress bars and counters

### Transition Animations
1. **Screen Transitions**: Slide animations between screens
2. **Modal Presentations**: Scale and fade animations
3. **Loading States**: Skeleton loading animations

## Error Handling

### Error Boundaries
```typescript
class AppErrorBoundary extends React.Component {
  // Catch and handle React component errors
}
```

### Error Types
1. **Storage Errors**: AsyncStorage failures
2. **Calculation Errors**: Invalid date calculations
3. **Rendering Errors**: Grid rendering failures
4. **Network Errors**: Future API integration errors

## Testing Strategy

### Unit Tests
- Date calculation utilities
- Storage management functions
- Component logic and state management

### Integration Tests
- Onboarding flow
- Data persistence
- Grid rendering and interactions

### E2E Tests
- Complete user journey
- Performance benchmarks
- Cross-platform compatibility

## Security Considerations

### Data Privacy
- No data transmitted to external servers
- Local storage encryption for sensitive data
- Secure date handling to prevent manipulation

### Input Validation
- Birth date validation (reasonable date ranges)
- Name input sanitization
- Prevent injection attacks in text inputs

## Accessibility

### Screen Reader Support
- Semantic HTML elements
- Proper ARIA labels
- Descriptive text for grid cells

### Visual Accessibility
- High contrast color schemes
- Scalable font sizes
- Color-blind friendly palette

### Motor Accessibility
- Large touch targets
- Gesture alternatives
- Voice control support (future)

## Performance Monitoring

### Metrics to Track
1. **App Launch Time**: Time to first meaningful paint
2. **Grid Render Time**: Time to render complete grid
3. **Memory Usage**: Peak and average memory consumption
4. **Frame Rate**: Maintain 60 FPS during interactions
5. **Storage Performance**: Read/write operation times

### Monitoring Tools
- React Native Performance Monitor
- Flipper for debugging
- Custom performance hooks for critical paths

## Future Scalability

### Planned Enhancements
1. **Cloud Sync**: Optional cloud backup
2. **Multiple Profiles**: Family member tracking
3. **Goals Integration**: Life goal tracking
4. **Social Features**: Share milestones
5. **Analytics**: Detailed life insights

### Architecture Considerations
- Modular design for easy feature addition
- API-ready data models
- Scalable state management
- Plugin architecture for extensions 