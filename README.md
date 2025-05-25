# Four Thousand Weeks

A React Native Expo app inspired by Oliver Burkeman's book "Four Thousand Weeks: Time Management for Mortals". This app visualizes a human lifespan as approximately 4,000 weeks (77 years) and helps users track their life progress through an interactive contribution graph.

## 📱 Features

- **Life Visualization**: Interactive grid showing your entire life in weeks
- **Progress Tracking**: Real-time calculation of weeks lived and remaining
- **Beautiful UI**: Clean, minimalist design with dark/light theme support
- **Personal Stats**: Detailed statistics about your life progress
- **Automatic Updates**: Grid updates automatically as weeks pass
- **Privacy First**: All data stored locally on your device

## 🎯 Core Concept

The average human lifespan is roughly 4,000 weeks. This app creates a visual representation where:
- Each square represents one week of your life
- Green squares show weeks you've already lived
- Orange square highlights your current week
- Gray squares represent future weeks

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (for development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd four-thousand-weeks
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
# or directly with expo
expo start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📁 Project Structure

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
│   └── grid/                    # Grid-related components
├── contexts/                    # React contexts
│   ├── UserContext.tsx          # User data management
│   └── ThemeContext.tsx         # Theme management
├── hooks/                       # Custom React hooks
├── utils/                       # Utility functions
├── types/                       # TypeScript definitions
└── docs/                        # Documentation
```

## 🛠 Tech Stack

- **React Native**: 0.79.2
- **Expo SDK**: 53+
- **TypeScript**: 5.8.3
- **Expo Router**: 5.0.6
- **AsyncStorage**: Local data persistence
- **Expo Haptics**: Tactile feedback
- **React Native Reanimated**: Smooth animations

## 📊 Key Components

### LifeGrid
The main visualization component that renders 4,000 week cells in an 80×50 grid format.

### WeekCell
Individual week representation with different states:
- `lived`: Green color for completed weeks
- `current`: Orange color for the current week
- `future`: Gray color for upcoming weeks

### Life Calculations
Automatic calculation of:
- Weeks lived since birth
- Estimated weeks remaining
- Life completion percentage
- Current age in years and weeks
- Time until next birthday

## 🎨 Design Philosophy

The app embraces minimalism and clarity to help users focus on the profound concept of life's finite nature. The design evokes contemplation while remaining approachable and non-overwhelming.

### Color Scheme
- **Life Green**: `#22C55E` - Represents weeks lived
- **Current Orange**: `#F59E0B` - Highlights the current week
- **Future Gray**: `#E5E7EB` - Represents future weeks

## 📱 User Flow

1. **Onboarding**: User enters name and birth date
2. **Grid View**: Main screen showing life visualization
3. **Statistics**: Detailed progress and insights
4. **Profile**: Settings and data management

## 🔒 Privacy & Data

- All data is stored locally using AsyncStorage
- No personal information is transmitted to external servers
- Users can reset all data at any time
- Complies with privacy regulations

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 📖 Documentation

Detailed documentation is available in the `docs/` directory:
- [Requirements](docs/REQUIREMENTS.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Design](docs/DESIGN.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by Oliver Burkeman's book "Four Thousand Weeks: Time Management for Mortals"
- Built with Expo and React Native
- Icons by Ionicons

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Remember**: Life is finite. Make your weeks count. 🕐
