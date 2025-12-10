# React Native TODO App

A production-ready TODO list application built with React Native, Expo, TypeScript, Redux Toolkit, and React Query. Features infinite scrolling pagination, dark/light mode, and comprehensive CRUD operations.

## ✨ Features

- ✅ **Fetch todos** from API on app load
- ✅ **Display todos** with checkboxes and timestamps
- ✅ **Add, Edit, Delete** todos
- ✅ **Mark as completed** with visual feedback
- ✅ **Filter** by All, Active, or Done
- ✅ **Sort** by Most Recent or by ID
- ✅ **Statistics** showing total, completed, and active todos
- ✅ **Timestamps** - Created and updated dates displayed
- ✅ **Infinite scrolling** - Pagination with auto-load on scroll
- ✅ **Dark/Light mode** toggle
- ✅ **Environment variables** - Secure API URL configuration
- ✅ **Performance optimized** - Memoization and FlatList optimizations

## 🛠️ Tech Stack

- **Framework**: Expo SDK 54
- **Language**: TypeScript
- **Navigation**: React Navigation v7
- **State Management**: Redux Toolkit
- **Data Fetching**: TanStack React Query + Axios
- **Styling**: StyleSheet with centralized theme system

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components (Button, Card, TextInput, Checkbox, etc.)
│   ├── todo/            # Todo-specific components (TodoItem, TodoList, FilterBar, etc.)
│   └── layout/          # Layout components (Header, Container)
├── screens/             # MainScreen, AddTodoScreen, EditTodoScreen
├── store/               # Redux store with todoSlice and themeSlice
├── services/            # API service layer
├── hooks/               # Custom hooks (useTodos, useTheme)
├── theme/               # Centralized theme (colors, spacing, typography)
├── config/              # Environment config and API endpoints
├── types/               # TypeScript definitions
├── utils/               # Helper functions and date utilities
└── navigation/          # Navigation setup
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Expo Go app (for testing on device)

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd rn-todo-app

# Install dependencies
npm install

# Create .env file (copy from env.example)
cp env.example .env

# Update .env with your API URL
# API_BASE_URL=https://jsonplaceholder.typicode.com

# Start development server
npm start
```

### Running the App

- Press `a` for Android emulator
- Press `i` for iOS simulator (macOS only)
- Press `w` for web
- Scan QR code with Expo Go app on your device

## ⚙️ Configuration

### Environment Variables

The app uses environment variables for API configuration:

**Local Development:**

- Create `.env` file in project root
- Add: `API_BASE_URL=https://your-api-url.com`

**EAS Builds:**

- Use EAS Secrets (see `easGuide.md`)
- `.env` files don't work in EAS builds

### API Endpoints

Configured in `src/config/apiEndpoints.ts`:

- `TODOS: '/todos'` - Fetch all todos

## 📱 Building for Production

### EAS Build (Recommended)

See **[easGuide.md](./easGuide.md)** for complete build instructions.

**Quick commands:**

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Set environment secret
eas secret:create --scope project --name API_BASE_URL --value "your-api-url"

# Build Android APK
eas build --platform android --profile preview

# Build iOS IPA
eas build --platform ios --profile preview
```

## 🎨 Features Explained

### Pagination

- **Frontend-driven** pagination (client-side)
- Loads 20 items per page
- Auto-loads more when scrolling to bottom
- Shows loading indicator during fetch

### Timestamps

- **Created at**: When todo was first created
- **Updated at**: Last modification time
- Displayed in relative format (e.g., "5m ago", "2h ago")
- Automatically updated on edit/completion

### Theme System

- **Centralized** theme configuration
- **Dark/Light mode** toggle in header
- Consistent colors, spacing, and typography
- Theme-aware components

## 🏗️ Architecture

### SOLID Principles

- **Single Responsibility**: Each component has one purpose
- **Open/Closed**: Extensible through props
- **Liskov Substitution**: Components are interchangeable
- **Interface Segregation**: Minimal prop requirements
- **Dependency Inversion**: Depend on abstractions

### Performance Optimizations

- `React.memo` for list items and filters
- `useCallback` for event handlers
- `useMemo` for filtered/sorted lists
- FlatList optimizations (removeClippedSubviews, windowSize)

## 📦 Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS (macOS only)
npm run web        # Run on web
```

## 🔧 Development

### Code Style

- TypeScript for type safety
- Component-based architecture
- Inline comments for complex logic
- Consistent naming conventions

### Key Files

- `App.tsx` - Root component with providers
- `src/screens/MainScreen.tsx` - Main todo list screen
- `src/store/slices/todoSlice.ts` - Redux state management
- `src/services/api.ts` - API service layer
- `src/config/env.ts` - Environment configuration

## 📚 API

Default API: [JSONPlaceholder](https://jsonplaceholder.typicode.com/todos)

- Endpoint: `GET /todos`
- Returns: 200 todo items
- Configure via `.env` or EAS Secrets

## 🐛 Troubleshooting

**App won't start:**

```bash
npm start -- --clear
```

**Build fails:**

- Check `easGuide.md` for EAS build troubleshooting
- Verify environment variables are set
- Run `npx expo-doctor` to check for issues

**API not working:**

- Verify `.env` file exists and has `API_BASE_URL`
- Check API endpoint is accessible
- For EAS builds, verify EAS Secrets are set

## 📄 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📖 Documentation

- **Build Guide**: See [easGuide.md](./easGuide.md) for EAS build instructions
- **Environment Setup**: See `env.example` for environment variable template
- **API Configuration**: See `src/config/apiEndpoints.ts` for endpoints

## 🎯 Project Status

✅ **Complete** - All features implemented and tested

- CRUD operations working
- Pagination implemented
- Timestamps displayed
- Dark/Light mode functional
- Environment variables configured
- Ready for QA builds

---

## 👨‍💻 Developer

**Dinesh Shinde**

---

**Built with ❤️ using React Native and Expo**
