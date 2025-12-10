import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { Typography } from "../common/Typography";
import { IconButton } from "../common/IconButton";
import { Spacer } from "../common/Spacer";

interface HeaderProps {
  title: string;
  rightAction?: {
    icon: string;
    onPress: () => void;
  };
}

export const Header: React.FC<HeaderProps> = ({ title, rightAction }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
      }}
    >
      <Typography variant="h2" weight="bold">
        {title}
      </Typography>
      {rightAction && (
        <IconButton
          icon={rightAction.icon}
          onPress={rightAction.onPress}
          variant="secondary"
          size="sm"
        />
      )}
    </View>
  );
};
