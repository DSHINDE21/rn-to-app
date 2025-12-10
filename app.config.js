require("dotenv").config();

module.exports = {
  expo: {
    name: "rn-todo-app",
    slug: "rn-todo-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    owner: "dshinde21",
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourcompany.rntodoapp", // REQUIRED FOR IOS BUILDS
    },
    android: {
      package: "com.yourcompany.rntodoapp", // REQUIRED FOR ANDROID BUILDS
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiBaseUrl: process.env.API_BASE_URL,
      eas: {
        projectId: "52da42e8-e0fd-47af-ae79-ba93722e350a",
      },
    },
  },
};
