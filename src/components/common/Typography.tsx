import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeContext";

interface TypographyProps extends TextProps {
  variant?: "h1" | "h2" | "h3" | "body" | "caption" | "button";
  color?: "primary" | "secondary" | "error" | "success";
  weight?: "regular" | "medium" | "semibold" | "bold";
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  color = "primary",
  weight = "regular",
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const getFontSize = () => {
    switch (variant) {
      case "h1":
        return theme.typography.sizes.xxxl;
      case "h2":
        return theme.typography.sizes.xxl;
      case "h3":
        return theme.typography.sizes.xl;
      case "body":
        return theme.typography.sizes.md;
      case "caption":
        return theme.typography.sizes.sm;
      case "button":
        return theme.typography.sizes.md;
      default:
        return theme.typography.sizes.md;
    }
  };

  const getColor = () => {
    switch (color) {
      case "primary":
        return theme.colors.text;
      case "secondary":
        return theme.colors.textSecondary;
      case "error":
        return theme.colors.error;
      case "success":
        return theme.colors.success;
      default:
        return theme.colors.text;
    }
  };

  const getFontWeight = () => {
    return theme.typography.weights[weight];
  };

  return (
    <Text
      style={[
        {
          fontSize: getFontSize(),
          color: getColor(),
          fontWeight: getFontWeight(),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
