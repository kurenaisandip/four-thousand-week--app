# Four Thousand Weeks - Design Document

## Design Philosophy

The Four Thousand Weeks app embraces minimalism and clarity to help users focus on the profound concept of life's finite nature. The design should evoke contemplation while remaining approachable and non-overwhelming.

### Core Principles

1. **Minimalism**: Clean, uncluttered interface that doesn't distract from the core message
2. **Clarity**: Clear visual hierarchy and intuitive navigation
3. **Emotional Resonance**: Design that connects with users on an emotional level
4. **Accessibility**: Inclusive design for all users
5. **Performance**: Smooth, responsive interactions

## Visual Identity

### Color Palette

#### Primary Colors
- **Life Green**: `#22C55E` - Represents weeks lived
- **Current Orange**: `#F59E0B` - Highlights the current week
- **Future Gray**: `#E5E7EB` - Represents future weeks
- **Background**: `#FFFFFF` (light) / `#111827` (dark)

#### Secondary Colors
- **Text Primary**: `#111827` (light) / `#F9FAFB` (dark)
- **Text Secondary**: `#6B7280` (light) / `#9CA3AF` (dark)
- **Border**: `#E5E7EB` (light) / `#374151` (dark)
- **Success**: `#10B981`
- **Warning**: `#F59E0B`
- **Error**: `#EF4444`

#### Semantic Colors
```typescript
interface ColorScheme {
  // Week states
  weekLived: string;      // #22C55E
  weekCurrent: string;    // #F59E0B
  weekFuture: string;     // #E5E7EB
  
  // UI elements
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  
  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  
  // Interactive
  buttonPrimary: string;
  buttonSecondary: string;
  inputBorder: string;
  inputFocus: string;
}
```

### Typography

#### Font Hierarchy
- **Primary Font**: System font (San Francisco on iOS, Roboto on Android)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

#### Text Styles
```typescript
interface TextStyles {
  // Headers
  h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 };
  h2: { fontSize: 24, fontWeight: '600', lineHeight: 32 };
  h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 };
  h4: { fontSize: 18, fontWeight: '600', lineHeight: 24 };
  
  // Body text
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 };
  bodySmall: { fontSize: 14, fontWeight: '400', lineHeight: 20 };
  
  // UI elements
  button: { fontSize: 16, fontWeight: '600', lineHeight: 24 };
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 };
  label: { fontSize: 14, fontWeight: '500', lineHeight: 20 };
}
```

## Layout System

### Grid System
- **Base Unit**: 8px
- **Spacing Scale**: 4, 8, 12, 16, 24, 32, 48, 64px
- **Container Padding**: 16px (mobile), 24px (tablet)
- **Component Spacing**: 16px between major sections

### Responsive Breakpoints
```typescript
interface Breakpoints {
  mobile: 0;      // 0px and up
  tablet: 768;    // 768px and up
  desktop: 1024;  // 1024px and up (future web support)
}
```

## Component Design

### Life Grid

#### Visual Design
- **Grid Dimensions**: 80 columns × 50 rows = 4,000 cells
- **Cell Size**: 8px × 8px (minimum), scalable with zoom
- **Cell Spacing**: 1px gap between cells
- **Border Radius**: 2px for rounded corners

#### States
1. **Lived Week**: Solid green fill (`#22C55E`)
2. **Current Week**: Orange fill with subtle pulse animation (`#F59E0B`)
3. **Future Week**: Light gray fill (`#E5E7EB`)

#### Interactions
- **Hover**: Subtle scale animation (1.1x)
- **Press**: Haptic feedback + temporary highlight
- **Long Press**: Show week details tooltip

### Onboarding Screens

#### Welcome Screen
```
┌─────────────────────────┐
│                         │
│    🕐 Four Thousand     │
│         Weeks           │
│                         │
│   Life is finite.       │
│   Make it count.        │
│                         │
│   [Get Started]         │
│                         │
└─────────────────────────┘
```

#### Name Input Screen
```
┌─────────────────────────┐
│                         │
│   What's your name?     │
│                         │
│   ┌─────────────────┐   │
│   │ Enter name...   │   │
│   └─────────────────┘   │
│                         │
│   [Continue]            │
│                         │
└─────────────────────────┘
```

#### Birth Date Screen
```
┌─────────────────────────┐
│                         │
│   When were you born?   │
│                         │
│   ┌─────────────────┐   │
│   │ Select date...  │   │
│   └─────────────────┘   │
│                         │
│   [Continue]            │
│                         │
└─────────────────────────┘
```

### Main Grid Screen

#### Layout Structure
```
┌─────────────────────────┐
│ Header: Stats Summary   │
├─────────────────────────┤
│                         │
│    Life Grid Area       │
│   (Scrollable/Zoomable) │
│                         │
├─────────────────────────┤
│ Controls: Zoom/Reset    │
└─────────────────────────┘
```

#### Header Stats
- **Weeks Lived**: Large number with label
- **Completion %**: Progress bar
- **Current Age**: Years and weeks

### Statistics Screen

#### Cards Layout
```
┌─────────────────────────┐
│ ┌─────────┐ ┌─────────┐ │
│ │ Weeks   │ │ Years   │ │
│ │ Lived   │ │ Lived   │ │
│ └─────────┘ └─────────┘ │
│ ┌─────────┐ ┌─────────┐ │
│ │ Weeks   │ │ Life    │ │
│ │ Left    │ │ Progress│ │
│ └─────────┘ └─────────┘ │
└─────────────────────────┘
```

### Profile Screen

#### Settings Layout
```
┌─────────────────────────┐
│ Profile Header          │
│ ┌─────────────────────┐ │
│ │ Name: John Doe      │ │
│ │ Born: Jan 1, 1990   │ │
│ └─────────────────────┘ │
│                         │
│ Settings                │
│ • Edit Birth Date       │
│ • Theme Preference      │
│ • About                 │
│                         │
└─────────────────────────┘
```

## Animations & Interactions

### Micro-Interactions

#### Grid Animations
1. **Initial Load**: Staggered fade-in of grid cells (100ms delay per row)
2. **Week Transition**: Smooth color transition over 500ms
3. **Current Week Pulse**: Subtle opacity animation (0.8 → 1.0, 2s duration)
4. **Zoom**: Smooth scale transition with momentum

#### Navigation Animations
1. **Screen Transitions**: Slide animation (300ms, ease-out)
2. **Modal Presentation**: Scale + fade (250ms)
3. **Button Press**: Scale down (0.95x, 100ms)

#### Loading States
1. **Skeleton Loading**: Shimmer effect for content areas
2. **Progress Indicators**: Smooth progress bar animations
3. **Spinner**: Rotating activity indicator

### Gesture Interactions

#### Grid Gestures
- **Pan**: Scroll through the grid
- **Pinch**: Zoom in/out (0.5x to 3x scale)
- **Double Tap**: Reset to default zoom
- **Long Press**: Show week details

#### Navigation Gestures
- **Swipe**: Navigate between tabs
- **Pull to Refresh**: Refresh calculations (future feature)

## Accessibility Design

### Visual Accessibility
- **Contrast Ratios**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Color Independence**: Information not conveyed by color alone
- **Focus Indicators**: Clear visual focus states
- **Text Scaling**: Support for dynamic type sizes

### Motor Accessibility
- **Touch Targets**: Minimum 44px × 44px
- **Gesture Alternatives**: Button alternatives for all gestures
- **Timeout Extensions**: No automatic timeouts

### Cognitive Accessibility
- **Clear Labels**: Descriptive text for all interactive elements
- **Consistent Navigation**: Predictable interaction patterns
- **Error Prevention**: Clear validation and helpful error messages

## Dark Mode Design

### Color Adaptations
- **Background**: Deep dark (`#111827`)
- **Surface**: Elevated dark (`#1F2937`)
- **Week Colors**: Adjusted for dark backgrounds
  - Lived: `#16A34A` (slightly darker green)
  - Current: `#D97706` (slightly darker orange)
  - Future: `#374151` (dark gray)

### Visual Adjustments
- **Reduced Shadows**: Minimal shadows in dark mode
- **Border Emphasis**: Subtle borders for definition
- **Icon Adjustments**: Lighter icon weights

## Platform-Specific Considerations

### iOS Design
- **Navigation**: Native iOS navigation patterns
- **Typography**: San Francisco font system
- **Interactions**: iOS-style haptic feedback
- **Status Bar**: Adaptive status bar styling

### Android Design
- **Material Design**: Follow Material Design 3 principles
- **Typography**: Roboto font system
- **Interactions**: Material ripple effects
- **Navigation**: Android navigation patterns

## Performance Considerations

### Visual Performance
- **60 FPS**: Maintain smooth animations
- **Efficient Rendering**: Minimize overdraw
- **Image Optimization**: Appropriate image formats and sizes
- **Memory Management**: Efficient component lifecycle

### Loading Strategies
- **Progressive Loading**: Load critical content first
- **Skeleton Screens**: Show structure while loading
- **Lazy Loading**: Load non-critical content on demand

## Design Tokens

### Spacing
```typescript
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};
```

### Border Radius
```typescript
const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};
```

### Shadows
```typescript
const shadows = {
  sm: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};
```

## Design System Implementation

### Component Library Structure
```
components/
├── ui/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.styles.ts
│   │   └── Button.stories.tsx
│   ├── Input/
│   ├── Card/
│   └── ...
└── design-tokens/
    ├── colors.ts
    ├── typography.ts
    ├── spacing.ts
    └── animations.ts
```

### Style Organization
- **Styled Components**: Component-specific styles
- **Theme Provider**: Global theme management
- **Design Tokens**: Centralized design values
- **Responsive Utilities**: Screen size helpers

This design system ensures consistency, accessibility, and maintainability while creating an emotionally resonant experience that helps users contemplate the finite nature of life in a beautiful, non-overwhelming way. 