import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { useTheme } from "../../theme/ThemeContext";

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  size?: number;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onPress,
  size = 24,
  disabled = false,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        {
          width: size,
          height: size,
          borderWidth: 2,
          borderColor: checked ? theme.colors.primary : theme.colors.border,
          borderRadius: 4,
          backgroundColor: checked ? theme.colors.primary : "transparent",
          alignItems: "center",
          justifyContent: "center",
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      {checked && (
        <Text
          style={{
            color: theme.colors.background,
            fontSize: size * 0.7,
            fontWeight: "bold",
          }}
        >
          ✓
        </Text>
      )}
    </TouchableOpacity>
  );
};
