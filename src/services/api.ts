import axios from "axios";
import { Todo } from "../types/todo";
import { getCurrentTimestamp } from "../utils/helpers";
import { ENV } from "../config/env";
import { API_ENDPOINTS } from "../config/apiEndpoints";

const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const transformTodo = (todo: any): Todo => {
  const now = getCurrentTimestamp();
  return {
    ...todo,
    created_at: todo.created_at || now,
    updated_at: todo.updated_at || now,
  };
};

export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response = await api.get(API_ENDPOINTS.TODOS);
    return response.data.map(transformTodo);
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export default api;
