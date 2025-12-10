import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { TodoSortBy } from "../../types/todo";
import { Button } from "../common/Button";
import { Typography } from "../common/Typography";
import { Spacer } from "../common/Spacer";
import { useTheme } from "../../theme/ThemeContext";

interface SortOptionsProps {
  currentSort: TodoSortBy;
  onSortChange: (sort: TodoSortBy) => void;
}

export const SortOptions = memo<SortOptionsProps>(
  ({ currentSort, onSortChange }) => {
    const { theme } = useTheme();

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          backgroundColor: theme.colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          gap: theme.spacing.sm,
        }}
      >
        <Typography variant="body" weight="medium">
          Sort by:
        </Typography>
        <Button
          title="Most Recent"
          variant={currentSort === "recent" ? "primary" : "outline"}
          onPress={() => onSortChange("recent")}
          style={{ flex: 1 }}
        />
        <Button
          title="By ID"
          variant={currentSort === "id" ? "primary" : "outline"}
          onPress={() => onSortChange("id")}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
);

SortOptions.displayName = "SortOptions";
