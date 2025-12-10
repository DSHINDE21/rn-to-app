import React, { useCallback, useMemo, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { Container } from "../components/layout/Container";
import { Header } from "../components/layout/Header";
import { TodoList } from "../components/todo/TodoList";
import { FilterBar } from "../components/todo/FilterBar";
import { SortOptions } from "../components/todo/SortOptions";
import { TodoStats } from "../components/todo/TodoStats";
import { Button } from "../components/common/Button";
import { Typography } from "../components/common/Typography";
import { Spacer } from "../components/common/Spacer";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  setFilter,
  setSortBy,
  toggleComplete,
  deleteTodo,
  loadMoreTodos,
  resetPagination,
  setLoadingMore,
} from "../store/slices/todoSlice";
import { processTodos, paginateTodos } from "../utils/helpers";
import { useFetchTodos } from "../hooks/useTodos";
import { Todo } from "../types/todo";
import { useTheme } from "../theme/ThemeContext";

type MainScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MainScreen"
>;

const PAGINATION_DELAY_MS = 1500; // delay

export const MainScreen: React.FC = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { todos, filter, sortBy, pagination } = useAppSelector(
    (state) => state.todos
  );

  const { isLoading, error, refetch } = useFetchTodos();

  const filteredAndSortedTodos = useMemo(
    () => processTodos(todos, filter, sortBy),
    [todos, filter, sortBy]
  );

  const processedTodos = useMemo(() => {
    return paginateTodos(
      filteredAndSortedTodos,
      pagination.page,
      pagination.pageSize
    );
  }, [filteredAndSortedTodos, pagination.page, pagination.pageSize]);

  const hasMore = useMemo(() => {
    return (
      filteredAndSortedTodos.length > pagination.page * pagination.pageSize
    );
  }, [filteredAndSortedTodos.length, pagination.page, pagination.pageSize]);

  // Calculate stats
  const stats = useMemo(() => {
    const completed = todos.filter((todo) => todo.completed).length;
    return {
      total: todos.length,
      completed,
    };
  }, [todos]);

  const handleFilterChange = useCallback(
    (newFilter: typeof filter) => {
      dispatch(setFilter(newFilter));
      dispatch(resetPagination());
    },
    [dispatch]
  );

  const handleSortChange = useCallback(
    (newSort: typeof sortBy) => {
      dispatch(setSortBy(newSort));
      dispatch(resetPagination());
    },
    [dispatch]
  );

  const handleLoadMore = useCallback(async () => {
    if (hasMore && !pagination.isLoadingMore) {
      dispatch(setLoadingMore(true));

      await new Promise((resolve) => setTimeout(resolve, PAGINATION_DELAY_MS));

      dispatch(loadMoreTodos());
      dispatch(setLoadingMore(false));
    }
  }, [hasMore, pagination.isLoadingMore, dispatch]);

  const handleToggle = useCallback(
    (id: number) => {
      dispatch(toggleComplete(id));
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteTodo(id));
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (todo: Todo) => {
      navigation.navigate("EditTodoScreen", { todo });
    },
    [navigation]
  );

  const handleAddTodo = useCallback(() => {
    navigation.navigate("AddTodoScreen");
  }, [navigation]);

  // Theme toggle icon
  const themeIcon = theme.mode === "light" ? "🌙" : "☀️";

  if (isLoading) {
    return (
      <Container>
        <Header
          title="TODO App"
          rightAction={{ icon: themeIcon, onPress: toggleTheme }}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header
          title="TODO App"
          rightAction={{ icon: themeIcon, onPress: toggleTheme }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: theme.spacing.lg,
          }}
        >
          <Typography
            variant="body"
            color="error"
            style={{ marginBottom: theme.spacing.md, textAlign: "center" }}
          >
            Failed to load todos. Please try again.
          </Typography>
          <Button title="Retry" onPress={() => refetch()} />
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <Header
        title="TODO App"
        rightAction={{ icon: themeIcon, onPress: toggleTheme }}
      />
      <TodoStats total={stats.total} completed={stats.completed} />
      <FilterBar currentFilter={filter} onFilterChange={handleFilterChange} />
      <SortOptions currentSort={sortBy} onSortChange={handleSortChange} />
      <View style={{ flex: 1 }}>
        <TodoList
          todos={processedTodos}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          isLoadingMore={pagination.isLoadingMore}
        />
      </View>
      <View style={{ padding: theme.spacing.md }}>
        <Button title="Add New Todo" onPress={handleAddTodo} fullWidth />
      </View>
    </Container>
  );
};
