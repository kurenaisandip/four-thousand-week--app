# Four Thousand Weeks - Requirements Document

## Project Overview

The "Four Thousand Weeks" app is a React Native Expo application inspired by Oliver Burkeman's book "Four Thousand Weeks: Time Management for Mortals". The app visualizes a human lifespan as approximately 4,000 weeks (77 years) and helps users track their life progress through an interactive contribution graph.

## Core Concept

The average human lifespan is roughly 4,000 weeks. This app creates a visual representation of this concept, showing users:
- How many weeks they've already lived
- How many weeks they have remaining (estimated)
- A visual grid similar to GitHub's contribution graph
- Real-time progression as weeks pass

## Functional Requirements

### 1. User Onboarding
- **FR-001**: App must prompt for user's name on first launch
- **FR-002**: App must request user's birth date (date picker)
- **FR-003**: App must validate birth date (cannot be future date)
- **FR-004**: App must store user data locally using AsyncStorage
- **FR-005**: App must calculate user's current age in weeks

### 2. Life Grid Visualization
- **FR-006**: Display a 4,000-week grid (80 columns × 50 rows)
- **FR-007**: Each cell represents one week of life
- **FR-008**: Completed weeks must be colored green
- **FR-009**: Current week must be highlighted with a different color
- **FR-010**: Future weeks must remain gray/empty
- **FR-011**: Grid must be scrollable and zoomable
- **FR-012**: Grid must update automatically when a new week begins

### 3. Progress Tracking
- **FR-013**: Calculate and display weeks lived
- **FR-014**: Calculate and display estimated weeks remaining
- **FR-015**: Show percentage of life completed
- **FR-016**: Display current age in years and weeks
- **FR-017**: Show time until next birthday

### 4. Data Management
- **FR-018**: Persist user data across app sessions
- **FR-019**: Allow users to edit their birth date
- **FR-020**: Backup data to device storage
- **FR-021**: Handle app updates without data loss

### 5. User Interface
- **FR-022**: Clean, minimalist design
- **FR-023**: Dark/light theme support
- **FR-024**: Responsive design for different screen sizes
- **FR-025**: Smooth animations and transitions
- **FR-026**: Accessibility support (screen readers, etc.)

## Non-Functional Requirements

### Performance
- **NFR-001**: App must load within 3 seconds
- **NFR-002**: Grid rendering must be smooth (60 FPS)
- **NFR-003**: Memory usage must not exceed 100MB

### Compatibility
- **NFR-004**: Support iOS 13+ and Android 8+
- **NFR-005**: Work on tablets and phones
- **NFR-006**: Support both portrait and landscape orientations

### Security & Privacy
- **NFR-007**: All data stored locally (no cloud storage)
- **NFR-008**: No personal data transmitted to external servers
- **NFR-009**: Comply with privacy regulations

### Usability
- **NFR-010**: Intuitive navigation without tutorials
- **NFR-011**: Clear visual feedback for all interactions
- **NFR-012**: Error messages must be user-friendly

## Technical Requirements

### Platform
- React Native with Expo SDK 53+
- TypeScript for type safety
- Expo Router for navigation

### Dependencies
- `@react-native-async-storage/async-storage` - Local data storage
- `react-native-svg` - Grid visualization
- `expo-haptics` - Tactile feedback
- `react-native-reanimated` - Smooth animations
- `expo-date-picker` - Date selection

### Architecture
- Component-based architecture
- Custom hooks for business logic
- Context API for global state management
- Modular file structure

## User Stories

### Epic 1: First Time User Experience
- **US-001**: As a new user, I want to enter my name so the app can personalize my experience
- **US-002**: As a new user, I want to enter my birth date so the app can calculate my life progress
- **US-003**: As a new user, I want to see my life grid immediately after setup

### Epic 2: Life Visualization
- **US-004**: As a user, I want to see a visual grid of my entire life in weeks
- **US-005**: As a user, I want to see which weeks I've already lived (green boxes)
- **US-006**: As a user, I want to see my current week highlighted
- **US-007**: As a user, I want to zoom and pan the grid to explore different periods

### Epic 3: Progress Tracking
- **US-008**: As a user, I want to see how many weeks I've lived
- **US-009**: As a user, I want to see how many weeks I have left (estimated)
- **US-010**: As a user, I want to see my life completion percentage
- **US-011**: As a user, I want the app to automatically update when a new week begins

### Epic 4: Personalization
- **US-012**: As a user, I want to edit my birth date if I entered it incorrectly
- **US-013**: As a user, I want to choose between dark and light themes
- **US-014**: As a user, I want my data to persist between app sessions

## Acceptance Criteria

### Grid Visualization
- Grid displays exactly 4,000 cells (80×50)
- Completed weeks are visually distinct (green)
- Current week is highlighted differently
- Grid is responsive and performant
- Smooth scrolling and zooming

### Data Accuracy
- Week calculations are mathematically correct
- Automatic updates occur at week boundaries
- Birth date validation prevents invalid entries
- Data persists across app restarts

### User Experience
- Onboarding flow is intuitive and quick
- Visual feedback for all user actions
- App works offline
- No crashes or performance issues

## Out of Scope (V1)

- Social sharing features
- Goal setting and tracking
- Notifications and reminders
- Cloud synchronization
- Multiple user profiles
- Export functionality
- Detailed analytics

## Success Metrics

- User completes onboarding within 2 minutes
- App loads and displays grid within 3 seconds
- Zero crashes during normal usage
- Smooth 60 FPS performance on target devices
- 95% user retention after first week

## Risk Assessment

### Technical Risks
- **High**: Grid performance with 4,000 cells
- **Medium**: Date calculations across time zones
- **Low**: Data persistence reliability

### Mitigation Strategies
- Implement virtualized grid rendering
- Use UTC for all date calculations
- Comprehensive testing of AsyncStorage

## Timeline Estimate

- **Week 1**: Project setup, documentation, basic navigation
- **Week 2**: User onboarding flow, data storage
- **Week 3**: Grid visualization and calculations
- **Week 4**: UI polish, animations, testing
- **Week 5**: Bug fixes, performance optimization
- **Week 6**: Final testing, deployment preparation 