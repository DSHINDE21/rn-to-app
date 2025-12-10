import React, { useMemo, useCallback } from 'react';
import { FlatList, ListRenderItem, ActivityIndicator, View } from 'react-native';
import { Todo } from '../../types/todo';
import { TodoItem } from './TodoItem';
import { EmptyState } from './EmptyState';
import { useTheme } from '../../theme/ThemeContext';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onEdit,
  onDelete,
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
}) => {
  const { theme } = useTheme();

  const renderItem: ListRenderItem<Todo> = useMemo(
    () =>
      ({ item }) =>
        (
          <TodoItem
            todo={item}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
    [onToggle, onEdit, onDelete]
  );

  const keyExtractor = useMemo(() => (item: Todo) => item.id.toString(), []);

  const handleEndReached = useCallback(() => {
    if (hasMore && !isLoadingMore && onLoadMore) {
      onLoadMore();
    }
  }, [hasMore, isLoadingMore, onLoadMore]);

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;
    return (
      <View style={{ padding: theme.spacing.md }}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </View>
    );
  }, [isLoadingMore, theme]);

  if (todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <FlatList
      data={todos}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={{
        padding: theme.spacing.md,
        paddingBottom: theme.spacing.xl,
      }}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

