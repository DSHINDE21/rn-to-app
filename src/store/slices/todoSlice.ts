import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodoFilter, TodoSortBy, TodoState } from "../../types/todo";
import { getCurrentTimestamp } from "../../utils/helpers";

const initialState: TodoState = {
  todos: [],
  filter: "all",
  sortBy: "recent",
  pagination: {
    page: 1,
    pageSize: 20,
    hasMore: true,
    isLoadingMore: false,
  },
};

/**
 * Todo slice managing all todo-related state
 * Handles CRUD operations, filtering, and sorting
 */
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      const totalItems = action.payload.length;
      state.pagination.hasMore =
        totalItems > state.pagination.page * state.pagination.pageSize;
    },

    /**
     * Add a new todo item
     */
    addTodo: (
      state,
      action: PayloadAction<Omit<Todo, "id" | "created_at" | "updated_at">>
    ) => {
      const now = getCurrentTimestamp();
      const newTodo: Todo = {
        ...action.payload,
        id: Date.now(), // Generate unique ID
        created_at: now,
        updated_at: now,
      };
      state.todos.push(newTodo);
    },

    /**
     * Update an existing todo item
     */
    updateTodo: (
      state,
      action: PayloadAction<Partial<Todo> & { id: number }>
    ) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = {
          ...state.todos[index],
          ...action.payload,
          updated_at: getCurrentTimestamp(),
        };
      }
    },

    /**
     * Delete a todo item
     */
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    /**
     * Toggle completion status of a todo
     */
    toggleComplete: (state, action: PayloadAction<number>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.todos[index].completed = !state.todos[index].completed;
        state.todos[index].updated_at = getCurrentTimestamp();
      }
    },

    setFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.filter = action.payload;
      state.pagination.page = 1;
    },

    setSortBy: (state, action: PayloadAction<TodoSortBy>) => {
      state.sortBy = action.payload;
      state.pagination.page = 1;
    },

    loadMoreTodos: (state) => {
      const totalItems = state.todos.length;
      const nextPage = state.pagination.page + 1;
      const maxItems = nextPage * state.pagination.pageSize;

      if (totalItems > maxItems) {
        state.pagination.page = nextPage;
        state.pagination.hasMore = totalItems > maxItems;
      } else {
        state.pagination.hasMore = false;
      }
    },

    resetPagination: (state) => {
      state.pagination.page = 1;
      const totalItems = state.todos.length;
      state.pagination.hasMore = totalItems > state.pagination.pageSize;
    },

    setLoadingMore: (state, action: PayloadAction<boolean>) => {
      state.pagination.isLoadingMore = action.payload;
    },
  },
});

export const {
  setTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleComplete,
  setFilter,
  setSortBy,
  loadMoreTodos,
  resetPagination,
  setLoadingMore,
} = todoSlice.actions;

export default todoSlice.reducer;
