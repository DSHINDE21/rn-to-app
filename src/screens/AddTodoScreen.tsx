import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Container } from "../components/layout/Container";
import { Header } from "../components/layout/Header";
import { TextInput } from "../components/common/TextInput";
import { Button } from "../components/common/Button";
import { Typography } from "../components/common/Typography";
import { Spacer } from "../components/common/Spacer";
import { useAppDispatch } from "../store/hooks";
import { addTodo } from "../store/slices/todoSlice";
import { useTheme } from "../theme/ThemeContext";

export const AddTodoScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSave = useCallback(() => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }

    // Add todo
    dispatch(
      addTodo({
        title: title.trim(),
        completed: false,
        userId: 1, // Default user ID
      })
    );

    // Navigate back
    navigation.goBack();
  }, [title, dispatch, navigation]);

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <Header title="Add Todo" />
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
              title="Add Todo"
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
