import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { Typography } from "../common/Typography";
import { Card } from "../common/Card";
import { useTheme } from "../../theme/ThemeContext";

interface TodoStatsProps {
  total: number;
  completed: number;
}

export const TodoStats = memo<TodoStatsProps>(({ total, completed }) => {
  const { theme } = useTheme();
  const active = total - completed;

  return (
    <Card
      padding
      margin
      style={{
        marginHorizontal: theme.spacing.md,
        marginTop: theme.spacing.md,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View style={{ alignItems: "center" }}>
          <Typography variant="h2" weight="bold">
            {total}
          </Typography>
          <Typography variant="caption" color="secondary">
            Total
          </Typography>
        </View>
        <View style={{ alignItems: "center" }}>
          <Typography variant="h2" weight="bold" color="success">
            {completed}
          </Typography>
          <Typography variant="caption" color="secondary">
            Completed
          </Typography>
        </View>
        <View style={{ alignItems: "center" }}>
          <Typography variant="h2" weight="bold">
            {active}
          </Typography>
          <Typography variant="caption" color="secondary">
            Active
          </Typography>
        </View>
      </View>
    </Card>
  );
});

TodoStats.displayName = "TodoStats";
