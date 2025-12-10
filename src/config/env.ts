import Constants from "expo-constants";

export const ENV = {
  API_BASE_URL: Constants.expoConfig?.extra?.apiBaseUrl,
} as const;
