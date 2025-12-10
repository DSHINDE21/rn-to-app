import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  View,
} from "react-native";
import { Typography } from "./Typography";
import { useTheme } from "../../theme/ThemeContext";

interface IconButtonProps extends Omit<TouchableOpacityProps, "style"> {
  icon?: string;
  label?: string;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  style?: TouchableOpacityProps["style"];
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  variant = "secondary",
  size = "md",
  disabled,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const getSize = () => {
    switch (size) {
      case "sm":
        return 32;
      case "md":
        return 40;
      case "lg":
        return 48;
      default:
        return 40;
    }
  };

  const getBackgroundColor = () => {
    switch (variant) {
      case "primary":
        return theme.colors.primary;
      case "secondary":
        return theme.colors.surface;
      case "danger":
        return theme.colors.error;
      default:
        return theme.colors.surface;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "primary":
        return theme.colors.background;
      case "secondary":
        return theme.colors.text;
      case "danger":
        return theme.colors.background;
      default:
        return theme.colors.text;
    }
  };

  const buttonSize = getSize();

  return (
    <TouchableOpacity
      style={[
        {
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
          backgroundColor: getBackgroundColor(),
          alignItems: "center",
          justifyContent: "center",
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      {icon && (
        <Typography
          variant="body"
          style={{
            color: getTextColor(),
            fontSize:
              size === "sm"
                ? theme.typography.sizes.sm
                : theme.typography.sizes.md,
          }}
        >
          {icon}
        </Typography>
      )}
      {label && (
        <Typography variant="caption" style={{ color: getTextColor() }}>
          {label}
        </Typography>
      )}
    </TouchableOpacity>
  );
};
