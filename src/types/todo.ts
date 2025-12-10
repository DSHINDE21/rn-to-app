/**
 * Todo item interface matching the JSONPlaceholder API structure
 * Extended with local timestamps for created_at and updated_at
 */
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

/**
 * Filter options for TODO list
 */
export type TodoFilter = "all" | "active" | "done";

/**
 * Sort options for TODO list
 */
export type TodoSortBy = "recent" | "id";

export interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
  sortBy: TodoSortBy;
  pagination: {
    page: number;
    pageSize: number;
    hasMore: boolean;
    isLoadingMore: boolean;
  };
}
