import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeContext";

interface CardProps extends ViewProps {
  padding?: boolean;
  margin?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = true,
  margin = false,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.surface,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: theme.colors.border,
          padding: padding ? theme.spacing.md : 0,
          marginVertical: margin ? theme.spacing.sm : 0,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
