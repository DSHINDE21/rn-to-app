import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { TodoFilter } from "../../types/todo";
import { Button } from "../common/Button";
import { useTheme } from "../../theme/ThemeContext";

interface FilterBarProps {
  currentFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
}

export const FilterBar = memo<FilterBarProps>(
  ({ currentFilter, onFilterChange }) => {
    const { theme } = useTheme();

    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          backgroundColor: theme.colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          gap: theme.spacing.sm,
        }}
      >
        <Button
          title="All"
          variant={currentFilter === "all" ? "primary" : "secondary"}
          onPress={() => onFilterChange("all")}
          style={{ flex: 1 }}
        />
        <Button
          title="Active"
          variant={currentFilter === "active" ? "primary" : "secondary"}
          onPress={() => onFilterChange("active")}
          style={{ flex: 1 }}
        />
        <Button
          title="Done"
          variant={currentFilter === "done" ? "primary" : "secondary"}
          onPress={() => onFilterChange("done")}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
);

FilterBar.displayName = "FilterBar";
