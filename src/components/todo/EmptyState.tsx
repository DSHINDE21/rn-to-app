import React from "react";
import { View, StyleSheet } from "react-native";
import { Typography } from "../common/Typography";
import { Spacer } from "../common/Spacer";
import { useTheme } from "../../theme/ThemeContext";

export const EmptyState: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing.xl,
      }}
    >
      <Typography variant="h3" color="secondary">
        No todos found
      </Typography>
      <Spacer size="sm" />
      <Typography
        variant="body"
        color="secondary"
        style={{ textAlign: "center" }}
      >
        Try changing your filter or add a new todo item
      </Typography>
    </View>
  );
};
