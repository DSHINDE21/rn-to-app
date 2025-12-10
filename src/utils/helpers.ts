import { Todo, TodoFilter, TodoSortBy } from "../types/todo";

export const getCurrentTimestamp = (): string => {
  return new Date().toISOString();
};

export const filterTodos = (todos: Todo[], filter: TodoFilter): Todo[] => {
  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "done":
      return todos.filter((todo) => todo.completed);
    case "all":
    default:
      return todos;
  }
};

export const sortTodos = (todos: Todo[], sortBy: TodoSortBy): Todo[] => {
  const sorted = [...todos];

  switch (sortBy) {
    case "recent":
      // Sort by updated_at descending (most recent first)
      return sorted.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    case "id":
      // Sort by ID ascending
      return sorted.sort((a, b) => a.id - b.id);
    default:
      return sorted;
  }
};

export const processTodos = (
  todos: Todo[],
  filter: TodoFilter,
  sortBy: TodoSortBy
): Todo[] => {
  const filtered = filterTodos(todos, filter);
  return sortTodos(filtered, sortBy);
};

export const paginateTodos = (
  todos: Todo[],
  page: number,
  pageSize: number
): Todo[] => {
  const startIndex = 0;
  const endIndex = page * pageSize;
  return todos.slice(startIndex, endIndex);
};
