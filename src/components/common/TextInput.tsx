import React from "react";
import {
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
  View,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";

interface CustomTextInputProps extends TextInputProps {
  error?: boolean;
  containerStyle?: View["props"]["style"];
}

export const TextInput: React.FC<CustomTextInputProps> = ({
  error = false,
  containerStyle,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View style={containerStyle}>
      <RNTextInput
        style={[
          {
            borderWidth: 1,
            borderColor: error ? theme.colors.error : theme.colors.border,
            borderRadius: 8,
            paddingVertical: theme.spacing.sm,
            paddingHorizontal: theme.spacing.md,
            fontSize: theme.typography.sizes.md,
            color: theme.colors.text,
            backgroundColor: theme.colors.surface,
            minHeight: 44,
          },
          style,
        ]}
        placeholderTextColor={theme.colors.textSecondary}
        {...props}
      />
    </View>
  );
};
