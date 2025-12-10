import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../theme/ThemeContext";

interface ContainerProps extends ViewProps {
  safeArea?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  safeArea = true,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: theme.colors.background,
          paddingTop: safeArea ? insets.top : 0,
          paddingBottom: safeArea ? insets.bottom : 0,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
