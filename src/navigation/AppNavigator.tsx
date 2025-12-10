import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { MainScreen, AddTodoScreen, EditTodoScreen } from "../screens";
import { useTheme } from "../theme/ThemeContext";

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="AddTodoScreen" component={AddTodoScreen} />
        <Stack.Screen name="EditTodoScreen" component={EditTodoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
