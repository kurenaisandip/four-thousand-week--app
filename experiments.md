# Learning Experiments for Four Thousand Weeks App

## Easy Experiments (Start Here!)

### 1. Change Colors
- Go to `utils/theme.ts`
- Change `weekLived: '#22C55E'` to `weekLived: '#FF6B6B'` (red)
- See how it affects the entire app

### 2. Add a New Statistic
- Go to `app/(tabs)/stats.tsx`
- Add a new StatCard showing "Days Lived" (weeksLived * 7)

### 3. Modify Grid Size
- Go to `utils/constants.ts`
- Change `GRID_COLUMNS: 80` to `GRID_COLUMNS: 40`
- See how it affects the grid layout

## Medium Experiments

### 4. Add a New Onboarding Step
- Create `app/onboarding/location.tsx`
- Ask for user's city
- Store it in UserContext

### 5. Add Motivational Quotes
- Create a quotes array
- Show random quotes on the stats screen

### 6. Add Week Details
- When user taps a week cell, show a modal
- Display the date range for that week

## Advanced Experiments

### 7. Add Data Export
- Create a function to export user data as JSON
- Add export button in profile screen

### 8. Add Notifications
- Use Expo Notifications
- Remind users weekly about their progress

### 9. Add Charts
- Install a charting library
- Show life progress as a pie chart

## Learning Questions to Ask Yourself

1. **Navigation**: How does the app know which screen to show first?
2. **State Management**: How does user data flow between screens?
3. **Storage**: Where is the birth date stored and how is it retrieved?
4. **Calculations**: How are the weeks calculated automatically?
5. **Theming**: How does dark/light mode work throughout the app?
6. **Performance**: Why is React.memo used in WeekCell?

## Debugging Exercises

1. **Break something intentionally**:
   - Comment out a line in UserContext
   - See what error you get and fix it

2. **Add console.logs**:
   - Add logs in useLifeCalculations
   - See when calculations happen

3. **Test edge cases**:
   - What happens with a future birth date?
   - What happens with a very old birth date?

## Next Steps After Understanding This App

1. **Build a simpler version** from scratch
2. **Add new features** to this app
3. **Study other Expo apps** on GitHub
4. **Read Expo documentation** with context from this app 