import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { Container } from "../components/layout/Container";
import { Header } from "../components/layout/Header";
import { TextInput } from "../components/common/TextInput";
import { Button } from "../components/common/Button";
import { Typography } from "../components/common/Typography";
import { Spacer } from "../components/common/Spacer";
import { Checkbox } from "../components/common/Checkbox";
import { useAppDispatch } from "../store/hooks";
import { updateTodo } from "../store/slices/todoSlice";
import { useTheme } from "../theme/ThemeContext";

type EditTodoScreenRouteProp = RouteProp<RootStackParamList, "EditTodoScreen">;

export const EditTodoScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<EditTodoScreenRouteProp>();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { todo } = route.params;

  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(todo.title);
    setCompleted(todo.completed);
  }, [todo]);

  const handleSave = useCallback(() => {
    // Validation
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }

    // Update todo
    dispatch(
      updateTodo({
        id: todo.id,
        title: title.trim(),
        completed,
      })
    );

    // Navigate back
    navigation.goBack();
  }, [title, completed, todo.id, dispatch, navigation]);

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleToggleComplete = useCallback(() => {
    setCompleted((prev) => !prev);
  }, []);

  return (
    <Container>
      <Header title="Edit Todo" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            padding: theme.spacing.md,
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: theme.spacing.md,
            }}
          >
            <Checkbox checked={completed} onPress={handleToggleComplete} />
            <Spacer horizontal size="md" />
            <Typography variant="body" weight="medium">
              Mark as {completed ? "Active" : "Completed"}
            </Typography>
          </View>

          <Typography variant="h3" weight="semibold">
            Todo Title
          </Typography>
          <Spacer size="sm" />
          <TextInput
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              setError("");
            }}
            placeholder="Enter todo title..."
            error={!!error}
            autoFocus
            multiline
            numberOfLines={3}
          />
          {error ? (
            <>
              <Spacer size="xs" />
              <Typography variant="caption" color="error">
                {error}
              </Typography>
            </>
          ) : null}
          <Spacer size="xl" />
          <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
            <Button
              title="Cancel"
              variant="outline"
              onPress={handleCancel}
              style={{ flex: 1 }}
            />
            <Button
              title="Save Changes"
              variant="primary"
              onPress={handleSave}
              style={{ flex: 1 }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};
