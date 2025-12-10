import React, { memo, useCallback, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Todo } from "../../types/todo";
import { Checkbox } from "../common/Checkbox";
import { Typography } from "../common/Typography";
import { IconButton } from "../common/IconButton";
import { Card } from "../common/Card";
import { Spacer } from "../common/Spacer";
import { useTheme } from "../../theme/ThemeContext";
import { formatTimestamp } from "../../utils/dateHelpers";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export const TodoItem = memo<TodoItemProps>(
  ({ todo, onToggle, onEdit, onDelete }) => {
    const { theme } = useTheme();

    const createdTime = useMemo(
      () => formatTimestamp(todo.created_at),
      [todo.created_at]
    );
    const updatedTime = useMemo(
      () => formatTimestamp(todo.updated_at),
      [todo.updated_at]
    );
    const isUpdated = useMemo(() => {
      return (
        new Date(todo.updated_at).getTime() >
        new Date(todo.created_at).getTime()
      );
    }, [todo.created_at, todo.updated_at]);

    const handleToggle = useCallback(() => {
      onToggle(todo.id);
    }, [todo.id, onToggle]);

    const handleEdit = useCallback(() => {
      onEdit(todo);
    }, [todo, onEdit]);

    const handleDelete = useCallback(() => {
      onDelete(todo.id);
    }, [todo.id, onDelete]);

    return (
      <Card margin padding style={{ marginVertical: theme.spacing.xs }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox checked={todo.completed} onPress={handleToggle} />
          <Spacer horizontal size="md" />
          <TouchableOpacity
            onPress={handleEdit}
            style={{ flex: 1 }}
            activeOpacity={0.7}
          >
            <Typography
              variant="body"
              style={{
                textDecorationLine: todo.completed ? "line-through" : "none",
                opacity: todo.completed ? 0.6 : 1,
              }}
              numberOfLines={2}
            >
              {todo.title}
            </Typography>
            <Spacer size="xs" />
            <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
              <Typography variant="caption" color="secondary">
                Created: {createdTime}
              </Typography>
              {isUpdated && (
                <>
                  <Typography variant="caption" color="secondary">
                    {" "}
                    •{" "}
                  </Typography>
                  <Typography variant="caption" color="secondary">
                    Updated: {updatedTime}
                  </Typography>
                </>
              )}
            </View>
          </TouchableOpacity>
          <Spacer horizontal size="sm" />
          <IconButton
            icon="✏️"
            onPress={handleEdit}
            variant="secondary"
            size="sm"
          />
          <Spacer horizontal size="xs" />
          <IconButton
            icon="🗑️"
            onPress={handleDelete}
            variant="danger"
            size="sm"
          />
        </View>
      </Card>
    );
  }
);

TodoItem.displayName = "TodoItem";
