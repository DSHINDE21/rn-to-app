import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Typography } from "./Typography";
import { useTheme } from "../../theme/ThemeContext";

interface ButtonProps extends Omit<TouchableOpacityProps, "style"> {
  title: string;
  variant?: "primary" | "secondary" | "outline";
  loading?: boolean;
  fullWidth?: boolean;
  style?: TouchableOpacityProps["style"];
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  loading = false,
  fullWidth = false,
  disabled,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const getButtonStyle = () => {
    const baseStyle: any = {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: 8,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      minHeight: 44,
    };

    if (fullWidth) {
      baseStyle.width = "100%";
    }

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          backgroundColor: theme.colors.primary,
        };
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
        };
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: theme.colors.primary,
        };
      default:
        return baseStyle;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "primary":
        return theme.colors.background;
      case "secondary":
        return theme.colors.text;
      case "outline":
        return theme.colors.primary;
      default:
        return theme.colors.text;
    }
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[getButtonStyle(), isDisabled && { opacity: 0.5 }, style]}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <Typography
          variant="button"
          color={variant === "primary" ? undefined : "primary"}
          style={{ color: getTextColor() }}
        >
          {title}
        </Typography>
      )}
    </TouchableOpacity>
  );
};
